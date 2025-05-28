"use client"
import { ProductDetailQuickView } from "@/components/detail/product-detail-quick-view"
import { FilterSidebar } from "@/components/filter-sidebar"
import { PageTitle } from "@/components/menu/page-title"
import { FilterButtons } from "@/components/menu/filter-buttons"
import { ProductGrid } from "@/components/menu/product-grid"
import { RecommendedProducts } from "@/components/menu/recommended-products"
import { BrandDescription } from "@/components/menu/brand-description"
import { BackToTop } from "@/components/menu/back-to-top"
import { SearchBar } from "@/components/menu/search-bar"
import { useMenuLogic } from "@/hooks/use-menu-logic"
import { useProducts } from "@/hooks/use-products"
import { ProductsLoading } from "@/components/menu/products-loading"
import { ProductsError } from "@/components/menu/products-error"
import { useEffect } from "react"

export default function MenuPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { products, loading, error, refetch } = useProducts()

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
  } = useMenuLogic(products)

  // Split filtered products for main grid and recommended
  const mainProducts = filteredProducts.slice(0, Math.ceil(filteredProducts.length / 2))
  const recommendedProducts = filteredProducts.slice(Math.ceil(filteredProducts.length / 2))

  return (
    <>
      {/* Main content container with consistent min-height to prevent layout shift */}
      <div className="mx-8 min-h-[calc(100vh-200px)]">
        <PageTitle />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          productCount={loading ? 0 : filteredProducts.length}
        />

        <FilterButtons
          onFilterClick={openFilterSidebar}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
          productCount={loading ? 0 : filteredProducts.length}
          selectedSort={selectedSortOption}
          onSortChange={handleSortChange}
        />

        {/* Content area with consistent structure */}
        {loading ? (
          <ProductsLoading />
        ) : error ? (
          <ProductsError error={error} onRetry={refetch} />
        ) : filteredProducts.length === 0 ? (
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

        <BrandDescription loading={loading} />
        <BackToTop show={showBackToTop} />
      </div>

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
