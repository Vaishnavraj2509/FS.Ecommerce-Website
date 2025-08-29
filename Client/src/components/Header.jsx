import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { setFilters } from '@/store/slices/productsSlice'
import { logout } from '@/store/slices/authSlice'
import { ShoppingCart, Search, User, Heart, Menu, LogOut } from 'lucide-react'

const Header = ({ onCartClick, onWishlistClick, onLoginClick }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.items)
  const { searchTerm } = useSelector(state => state.products.filters)
  const { user, isAuthenticated } = useSelector(state => state.auth)
  
  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  const handleSearch = (e) => {
    dispatch(setFilters({ searchTerm: e.target.value }))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleAccountClick = () => {
    if (!isAuthenticated) {
      onLoginClick()
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">ShopZone</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">Hi, {user.name}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">Logout</span>
                </Button>
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleAccountClick}
                className="relative"
              >
                <User className="h-5 w-5" />
                <span className="hidden md:inline ml-2">Login</span>
              </Button>
            )}
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onWishlistClick}
              className="relative"
            >
              <Heart className="h-5 w-5" />
              <span className="hidden md:inline ml-2">Wishlist</span>
            </Button>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:inline ml-2">Cart</span>
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header