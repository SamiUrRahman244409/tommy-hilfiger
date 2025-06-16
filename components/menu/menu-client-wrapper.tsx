"use client"

import { ProductDetailQuickView } from "@/components/detail/product-detail-quick-view"
import { FilterSidebar } from "@/components/filter-sidebar"
import { FilterButtons } from "@/components/menu/filter-buttons"
import { ProductGrid } from "@/components/menu/product-grid"
import { RecommendedProducts } from "@/components/menu/recommended-products"
import { BackToTop } from "@/components/menu/back-to-top"
import { SearchBar } from "@/components/menu/search-bar"
import { useMenuLogic } from "@/hooks/use-menu-logic"
import { useEffect } from "react"
import type { Product } from "@/types"

interface MenuClientWrapperProps {
  initialProducts: Product[]
  categories?: string[]
}

export function MenuClientWrapper({ initialProducts, categories = [] }: MenuClientWrapperProps) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const {
    visibleProducts,
    quickViewProduct,
    isQuickViewOpen,
    hoveredProductId,
    isFilterSidebarOpen,
    activeFilter,
    selectedCategories,
    currentImageIndices,
    showBackToTop,
    filteredProducts,
    selectedSizes,
    selectedPriceRanges,
    selectedSortOption,
    searchQuery,
    openQuickView,
    closeQuickView,
    openFilterSidebar,
    closeFilterSidebar,
    handleHover,
    handleCategoryChange,
    handleImageChange,
    handleSizeChange,
    handlePriceChange,
    handleSortChange,
    handleSearchChange,
    clearAllFilters,
  } = useMenuLogic(initialProducts)

  // Split filtered products for main grid and recommended
  const mainProducts = filteredProducts.slice(0, Math.ceil(filteredProducts.length / 2))
  const recommendedProducts = filteredProducts.slice(Math.ceil(filteredProducts.length / 2))

  return (
    <>
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} productCount={filteredProducts.length} />

      <FilterButtons
        onFilterClick={openFilterSidebar}
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        productCount={filteredProducts.length}
        selectedSort={selectedSortOption}
        onSortChange={handleSortChange}
      />

      {/* Content area with consistent structure */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">
            {searchQuery
              ? `No results found for "${searchQuery}". Try a different search term or check back later.`
              : "Try selecting a different category or check back later."}
          </p>
        </div>
      ) : (
        <>
          <ProductGrid
            products={mainProducts}
            visibleProducts={visibleProducts}
            hoveredProductId={hoveredProductId}
            currentImageIndices={currentImageIndices}
            onHover={handleHover}
            onImageChange={handleImageChange}
            onQuickView={openQuickView}
          />
          {recommendedProducts.length > 0 && (
            <RecommendedProducts
              products={recommendedProducts}
              hoveredProductId={hoveredProductId}
              currentImageIndices={currentImageIndices}
              onHover={handleHover}
              onImageChange={handleImageChange}
              onQuickView={openQuickView}
            />
          )}
        </>
      )}

      <BackToTop show={showBackToTop} />

      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={closeFilterSidebar}
        activeFilter={activeFilter}
        onCategoryChange={handleCategoryChange}
        selectedCategories={selectedCategories}
        onSizeChange={handleSizeChange}
        selectedSizes={selectedSizes}
        onPriceChange={handlePriceChange}
        selectedPriceRanges={selectedPriceRanges}
        onClearAll={clearAllFilters}
      />

      <ProductDetailQuickView isOpen={isQuickViewOpen} product={quickViewProduct} onClose={closeQuickView} />
    </>
  )
}
