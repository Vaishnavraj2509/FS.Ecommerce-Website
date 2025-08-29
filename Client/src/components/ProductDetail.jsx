import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { addToCart } from '@/store/slices/cartSlice'
import { setSelectedProduct } from '@/store/slices/productsSlice'
import { formatCurrency } from '@/lib/utils'
import { X, Star, Heart, ShoppingCart, Plus, Minus } from 'lucide-react'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const selectedProduct = useSelector(state => state.products.selectedProduct)
  const [quantity, setQuantity] = useState(1)

  if (!selectedProduct) return null

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      quantity: quantity
    }))
    dispatch(setSelectedProduct(null))
  }

  const handleClose = () => {
    dispatch(setSelectedProduct(null))
    setQuantity(1)
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  const discountPercentage = selectedProduct.originalPrice 
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg">
        <Card className="border-0 rounded-lg">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Product Details</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {!selectedProduct.inStock && (
                      <Badge variant="destructive">Out of Stock</Badge>
                    )}
                    {discountPercentage > 0 && (
                      <Badge className="bg-red-500">{discountPercentage}% OFF</Badge>
                    )}
                    {selectedProduct.tags?.includes('new') && (
                      <Badge className="bg-green-500">New</Badge>
                    )}
                    {selectedProduct.tags?.includes('bestseller') && (
                      <Badge className="bg-blue-500">Bestseller</Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Product Information */}
              <div className="space-y-6">
                <div>
                  <Badge variant="outline" className="mb-2">{selectedProduct.category}</Badge>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h1>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(selectedProduct.rating)}
                  </div>
                  <span className="text-lg font-medium">{selectedProduct.rating}</span>
                  <span className="text-gray-500">
                    ({selectedProduct.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatCurrency(selectedProduct.price)}
                    </span>
                    {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-xl text-gray-500 line-through">
                        {formatCurrency(selectedProduct.originalPrice)}
                      </span>
                    )}
                  </div>
                  {discountPercentage > 0 && (
                    <p className="text-green-600 font-medium">
                      You save {formatCurrency(selectedProduct.originalPrice - selectedProduct.price)} ({discountPercentage}% off)
                    </p>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${selectedProduct.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className={selectedProduct.inStock ? 'text-green-600' : 'text-red-600'}>
                    {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Quantity Selector */}
                {selectedProduct.inStock && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-medium">Quantity:</span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="h-10 w-10 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-medium w-12 text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                          className="h-10 w-10 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Total Price */}
                    <div className="text-xl font-bold text-gray-900">
                      Total: {formatCurrency(selectedProduct.price * quantity)}
                    </div>

                    {/* Add to Cart Button */}
                    <Button 
                      onClick={handleAddToCart}
                      size="lg"
                      className="w-full"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add {quantity} to Cart
                    </Button>
                  </div>
                )}

                {!selectedProduct.inStock && (
                  <Button disabled size="lg" className="w-full">
                    Out of Stock
                  </Button>
                )}

                {/* Additional Tags */}
                {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-medium text-gray-900">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.tags.map(tag => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProductDetail