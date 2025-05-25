"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductDetailQuickView } from "@/components/detail/product-detail-quick-view"
import { FilterSidebar } from "@/components/filter-sidebar"
import { PageTitle } from "@/components/menu/page-title"
import { FilterButtons } from "@/components/menu/filter-buttons"
import { ProductGrid } from "@/components/menu/product-grid"
import { RecommendedProducts } from "@/components/menu/recommended-products"
import { BrandDescription } from "@/components/menu/brand-description"
import { BackToTop } from "@/components/menu/back-to-top"
import { useMenuLogic } from "@/hooks/use-menu-logic"
import { useProducts } from "@/hooks/use-products"
import { ProductsLoading } from "@/components/menu/products-loading"
import { ProductsError } from "@/components/menu/products-error"

export default function MenuPage() {
  const { products, loading, error, refetch } = useProducts()

  const {
    visibleProducts,
    quickViewProduct,
    isQuickViewOpen,
    hoveredProductId,
    isFilterSidebarOpen,
    activeFilter,
    activeCategory,
    currentImageIndices,
    showBackToTop,
    filteredProducts,
    openQuickView,
    closeQuickView,
    openFilterSidebar,
    closeFilterSidebar,
    handleHover,
    handleCategoryChange,
    handleImageChange,
  } = useMenuLogic(products)

  // Split filtered products for main grid and recommended
  const mainProducts = filteredProducts.slice(0, Math.ceil(filteredProducts.length / 2))
  const recommendedProducts = filteredProducts.slice(Math.ceil(filteredProducts.length / 2))

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mx-8">
          <PageTitle />
          <FilterButtons
            onFilterClick={openFilterSidebar}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            productCount={0}
          />
          <ProductsLoading />
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mx-8">
          <PageTitle />
          <FilterButtons
            onFilterClick={openFilterSidebar}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            productCount={0}
          />
          <ProductsError error={error} onRetry={refetch} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mx-8">
        <PageTitle />
        <FilterButtons
          onFilterClick={openFilterSidebar}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          productCount={filteredProducts.length}
        />

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try selecting a different category or check back later.</p>
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

        <BrandDescription />
        <BackToTop show={showBackToTop} />
      </main>
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={closeFilterSidebar}
        activeFilter={activeFilter}
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />
      <ProductDetailQuickView isOpen={isQuickViewOpen} product={quickViewProduct} onClose={closeQuickView} />
      <Footer />
    </div>
  )
}
