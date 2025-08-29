import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from './ProductCard'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { setFilters, clearFilters } from '@/store/slices/productsSlice'
import { Filter, X } from 'lucide-react'

const ProductGrid = () => {
  const dispatch = useDispatch()
  const { items, categories, filters, loading } = useSelector(state => state.products)

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...items]

    // Search filter
    if (filters.searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product => product.category === filters.category)
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    )

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    return filtered
  }, [items, filters])

  const handleCategoryFilter = (category) => {
    dispatch(setFilters({ category: category === filters.category ? '' : category }))
  }

  const handleSortChange = (sortBy) => {
    dispatch(setFilters({ sortBy }))
  }

  const hasActiveFilters = filters.category || filters.searchTerm || 
    filters.priceRange[0] > 0 || filters.priceRange[1] < 250000

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filters and Sorting */}
      <div className="mb-6 space-y-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Filter className="h-4 w-4 mr-1" />
            Categories:
          </span>
          {categories.map(category => (
            <Button
              key={category.id}
              variant={filters.category === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(category.name)}
              className="text-xs"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          {[
            { value: 'name', label: 'Name' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'rating', label: 'Rating' },
            { value: 'newest', label: 'Newest' }
          ].map(option => (
            <Button
              key={option.value}
              variant={filters.sortBy === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => handleSortChange(option.value)}
              className="text-xs"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Active filters:</span>
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {filters.category}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => dispatch(setFilters({ category: '' }))}
                />
              </Badge>
            )}
            {filters.searchTerm && (
              <Badge variant="secondary" className="flex items-center gap-1">
                "{filters.searchTerm}"
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => dispatch(setFilters({ searchTerm: '' }))}
                />
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(clearFilters())}
              className="text-xs"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredProducts.length} of {items.length} products
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGrid