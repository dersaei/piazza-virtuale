// components/category/CategoryPageClient.tsx
'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import ShopGrid from './ShopGrid';
import type { Shop, Region, Product } from '@/lib/api/shops';

interface CategoryPageClientProps {
  initialShops: Shop[];
  regions: Region[];
  products: Product[];
  category: string;
  categoryLabel: string;
  initialFilters?: {
    region?: string;
    product?: string;
    search?: string;
  };
}

export default function CategoryPageClient({
  initialShops,
  regions,
  products,
  category,
  categoryLabel,
  initialFilters = {},
}: CategoryPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for immediate UI feedback (optimistic updates)
  const [displayedShops, setDisplayedShops] = useState(initialShops);
  const [isFiltering, setIsFiltering] = useState(false);

  // Current filter values
  const currentFilters = useMemo(
    () => ({
      region: searchParams.get('region') || initialFilters.region || '',
      product: searchParams.get('product') || initialFilters.product || '',
      search: searchParams.get('q') || initialFilters.search || '',
    }),
    [searchParams, initialFilters]
  );

  /**
   * Update URL with new filters
   * This triggers a server-side refetch with new data
   */
  const updateFilters = useCallback(
    (newFilters: Partial<typeof currentFilters>) => {
      setIsFiltering(true);

      const params = new URLSearchParams(searchParams.toString());

      // Update or remove filter params
      Object.entries({ ...currentFilters, ...newFilters }).forEach(
        ([key, value]) => {
          if (value && value.trim() !== '') {
            params.set(key === 'search' ? 'q' : key, value);
          } else {
            params.delete(key === 'search' ? 'q' : key);
          }
        }
      );

      // Navigate with new params (triggers server-side refetch)
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.push(newUrl, { scroll: false });

      // Reset filtering state after navigation
      setTimeout(() => setIsFiltering(false), 300);
    },
    [currentFilters, pathname, router, searchParams]
  );

  /**
   * Handle region filter change
   */
  const handleRegionChange = useCallback(
    (regionSlug: string) => {
      updateFilters({ region: regionSlug, product: '' }); // Reset product when region changes
    },
    [updateFilters]
  );

  /**
   * Handle product filter change
   */
  const handleProductChange = useCallback(
    (productSlug: string) => {
      updateFilters({ product: productSlug });
    },
    [updateFilters]
  );

  /**
   * Handle search query change
   */
  const handleSearchChange = useCallback(
    (query: string) => {
      updateFilters({ search: query });
    },
    [updateFilters]
  );

  /**
   * Clear all filters
   */
  const handleClearFilters = useCallback(() => {
    setIsFiltering(true);
    router.push(pathname, { scroll: false });
    setTimeout(() => setIsFiltering(false), 300);
  }, [pathname, router]);

  // Filter products by selected region (for cascading filters)
  const availableProducts = useMemo(() => {
    if (!currentFilters.region) return products;

    // If region is selected, only show products available in that region
    const shopsInRegion = initialShops.filter(
      shop => shop.region.slug === currentFilters.region
    );

    const productIds = new Set(
      shopsInRegion.flatMap(
        shop => shop.distinctive_products?.map(p => p.id) || []
      )
    );

    return products.filter(p => productIds.has(p.id));
  }, [currentFilters.region, products, initialShops]);

  // Check if any filters are active
  const hasActiveFilters =
    currentFilters.region || currentFilters.product || currentFilters.search;

  // Update displayed shops when initialShops change (from server)
  useMemo(() => {
    setDisplayedShops(initialShops);
  }, [initialShops]);

  return (
    <div className='category-content'>
      {/* Filters Section */}
      <aside className='filters-section'>
        <FilterBar
          regions={regions}
          products={availableProducts}
          selectedRegion={currentFilters.region}
          selectedProduct={currentFilters.product}
          onRegionChange={handleRegionChange}
          onProductChange={handleProductChange}
          onClearFilters={handleClearFilters}
          hasActiveFilters={!!hasActiveFilters}
          isLoading={isFiltering}
        />
      </aside>

      {/* Main Content */}
      <main className='shops-section'>
        {/* Search Bar */}
        <SearchBar
          initialQuery={currentFilters.search}
          onSearch={handleSearchChange}
          placeholder={`Cerca in ${categoryLabel.toLowerCase()}...`}
          isLoading={isFiltering}
        />

        {/* Results Summary */}
        <div className='results-summary'>
          <p>
            {isFiltering ? (
              'Caricamento...'
            ) : displayedShops.length === 0 ? (
              hasActiveFilters ? (
                'Nessun risultato trovato per i filtri selezionati.'
              ) : (
                'Nessun produttore disponibile in questa categoria.'
              )
            ) : (
              <>
                {displayedShops.length}{' '}
                {displayedShops.length === 1 ? 'produttore' : 'produttori'}
                {hasActiveFilters && ' trovati'}
              </>
            )}
          </p>
        </div>

        {/* Shop Grid */}
        <ShopGrid shops={displayedShops} isLoading={isFiltering} />

        {/* Empty State */}
        {!isFiltering && displayedShops.length === 0 && hasActiveFilters && (
          <div className='empty-state'>
            <p>Prova a modificare i filtri o a cercare qualcos&apos;altro.</p>
            <button
              type='button'
              onClick={handleClearFilters}
              className='clear-filters-button'
            >
              Rimuovi tutti i filtri
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
