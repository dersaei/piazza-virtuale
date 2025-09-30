// components/category/FilterBar.tsx
'use client';

import { useMemo } from 'react';
import styles from '@/styles/FilterBar.module.css';
import type { Region, Product } from '@/lib/api/shops';

interface FilterBarProps {
  regions: Region[];
  products: Product[];
  selectedRegion: string;
  selectedProduct: string;
  onRegionChange: (regionSlug: string) => void;
  onProductChange: (productSlug: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  isLoading?: boolean;
}

export default function FilterBar({
  regions,
  products,
  selectedRegion,
  selectedProduct,
  onRegionChange,
  onProductChange,
  onClearFilters,
  hasActiveFilters,
  isLoading = false,
}: FilterBarProps) {
  // Sort regions alphabetically
  const sortedRegions = useMemo(() => {
    return [...regions].sort((a, b) => a.name.localeCompare(b.name, 'it'));
  }, [regions]);

  // Sort products alphabetically
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => a.name.localeCompare(b.name, 'it'));
  }, [products]);

  const handleRegionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRegionChange(e.target.value);
  };

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onProductChange(e.target.value);
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterHeader}>
        <h3 className={styles.filterTitle}>Filtra per</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className={styles.clearButton}
            disabled={isLoading}
            type='button'
          >
            Rimuovi filtri
          </button>
        )}
      </div>

      <div className={styles.filterGroup}>
        {/* Region Filter */}
        <div className={styles.filterItem}>
          <label htmlFor='region-filter' className={styles.filterLabel}>
            Regione
          </label>
          <div className={styles.selectWrapper}>
            <select
              id='region-filter'
              value={selectedRegion}
              onChange={handleRegionSelect}
              className={styles.filterSelect}
              disabled={isLoading}
            >
              <option value=''>Tutte le regioni</option>
              {sortedRegions.map(region => (
                <option key={region.id} value={region.slug}>
                  {region.name}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden='true'>
              ▼
            </span>
          </div>
        </div>

        {/* Product Filter */}
        <div className={styles.filterItem}>
          <label htmlFor='product-filter' className={styles.filterLabel}>
            Prodotto distintivo
          </label>
          <div className={styles.selectWrapper}>
            <select
              id='product-filter'
              value={selectedProduct}
              onChange={handleProductSelect}
              className={styles.filterSelect}
              disabled={isLoading || products.length === 0}
            >
              <option value=''>Tutti i prodotti</option>
              {sortedProducts.map(product => (
                <option key={product.id} value={product.slug}>
                  {product.name}
                </option>
              ))}
            </select>
            <span className={styles.selectArrow} aria-hidden='true'>
              ▼
            </span>
          </div>
          {selectedRegion && products.length === 0 && (
            <p className={styles.noProductsMessage}>
              Nessun prodotto disponibile per questa regione
            </p>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className={styles.activeFilters}>
          <p className={styles.activeFiltersLabel}>Filtri attivi:</p>
          <div className={styles.filterTags}>
            {selectedRegion && (
              <span className={styles.filterTag}>
                {regions.find(r => r.slug === selectedRegion)?.name}
                <button
                  onClick={() => onRegionChange('')}
                  className={styles.removeTag}
                  aria-label='Rimuovi filtro regione'
                  type='button'
                >
                  ×
                </button>
              </span>
            )}
            {selectedProduct && (
              <span className={styles.filterTag}>
                {products.find(p => p.slug === selectedProduct)?.name}
                <button
                  onClick={() => onProductChange('')}
                  className={styles.removeTag}
                  aria-label='Rimuovi filtro prodotto'
                  type='button'
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <div className={styles.loadingIndicator}>
          <div className={styles.spinner} />
          <span>Aggiornamento...</span>
        </div>
      )}
    </div>
  );
}
