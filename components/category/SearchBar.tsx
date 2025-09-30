// components/category/SearchBar.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from '@/styles/SearchBar.module.css';

interface SearchBarProps {
  initialQuery?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  debounceMs?: number;
}

export default function SearchBar({
  initialQuery = '',
  onSearch,
  placeholder = 'Cerca produttori...',
  isLoading = false,
  debounceMs = 500,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update local state when initialQuery changes (e.g., browser back/forward)
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  /**
   * Debounced search to avoid excessive API calls
   */
  const debouncedSearch = useCallback(
    (searchQuery: string) => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        onSearch(searchQuery);
      }, debounceMs);
    },
    [onSearch, debounceMs]
  );

  /**
   * Handle input change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery);
  };

  /**
   * Handle form submission (pressing Enter)
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear any pending debounced search
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Trigger immediate search
    onSearch(query);

    // Blur input on mobile to hide keyboard
    inputRef.current?.blur();
  };

  /**
   * Clear search
   */
  const handleClear = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  /**
   * Cleanup debounce timer on unmount
   */
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const hasQuery = query.trim().length > 0;

  return (
    <div className={styles.searchBarContainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div
          className={`${styles.searchWrapper} ${isFocused ? styles.focused : ''} ${isLoading ? styles.loading : ''}`}
        >
          {/* Search Icon */}
          <div className={styles.searchIcon} aria-hidden='true'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type='text'
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={styles.searchInput}
            disabled={isLoading}
            aria-label='Cerca produttori'
            autoComplete='off'
            spellCheck='false'
          />

          {/* Clear Button */}
          {hasQuery && (
            <button
              type='button'
              onClick={handleClear}
              className={styles.clearButton}
              aria-label='Cancella ricerca'
              disabled={isLoading}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 4L4 12M4 4l8 8'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          )}

          {/* Loading Spinner */}
          {isLoading && (
            <div className={styles.loadingSpinner} aria-label='Caricamento'>
              <div className={styles.spinner} />
            </div>
          )}
        </div>

        {/* Search Button (visible on mobile) */}
        <button
          type='submit'
          className={styles.searchButton}
          disabled={isLoading || !hasQuery}
          aria-label='Avvia ricerca'
        >
          Cerca
        </button>
      </form>

      {/* Search Hint */}
      {isFocused && !hasQuery && (
        <p className={styles.searchHint}>
          Cerca per nome produttore, descrizione o caratteristiche
        </p>
      )}
    </div>
  );
}
