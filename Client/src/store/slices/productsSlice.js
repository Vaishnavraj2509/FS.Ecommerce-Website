import { createSlice } from '@reduxjs/toolkit'

// Dummy products data with Indian Rupee pricing and creation dates
const dummyProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description: "The latest iPhone with A16 Bionic chip and Pro camera system",
    price: 79900,
    originalPrice: 89900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    rating: 4.8,
    reviews: 245,
    inStock: true,
    tags: ["bestseller", "new"],
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: 2,
    name: "MacBook Air M2",
    description: "Ultra-thin laptop with M2 chip and all-day battery life",
    price: 99900,
    originalPrice: 109900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400",
    rating: 4.9,
    reviews: 189,
    inStock: true,
    tags: ["new", "featured"],
    createdAt: new Date('2024-02-20').toISOString()
  },
  {
    id: 3,
    name: "Nike Air Max 270",
    description: "Comfortable running shoes with Air Max cushioning",
    price: 12999,
    originalPrice: 14999,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    rating: 4.5,
    reviews: 432,
    inStock: true,
    tags: ["sale", "popular"],
    createdAt: new Date('2024-03-10').toISOString()
  },
  {
    id: 4,
    name: "Sony WH-1000XM4",
    description: "Industry-leading noise canceling wireless headphones",
    price: 22990,
    originalPrice: 29990,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    rating: 4.7,
    reviews: 567,
    inStock: true,
    tags: ["sale", "bestseller"],
    createdAt: new Date('2024-04-05').toISOString()
  },
  {
    id: 5,
    name: "Adidas Ultraboost 22",
    description: "High-performance running shoes with Boost midsole",
    price: 16999,
    originalPrice: 19999,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    rating: 4.6,
    reviews: 298,
    inStock: false,
    tags: ["new"],
    createdAt: new Date('2024-05-18').toISOString()
  },
  {
    id: 6,
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-leg jeans made with premium denim",
    price: 7999,
    originalPrice: 9999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    rating: 4.4,
    reviews: 187,
    inStock: true,
    tags: ["classic"],
    createdAt: new Date('2024-06-12').toISOString()
  },
  {
    id: 7,
    name: "Samsung Galaxy Watch 5",
    description: "Advanced smartwatch with health monitoring and GPS",
    price: 27999,
    originalPrice: 32999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    tags: ["new", "tech"],
    createdAt: new Date('2024-07-08').toISOString()
  },
  {
    id: 8,
    name: "The North Face Jacket",
    description: "Waterproof outdoor jacket for all weather conditions",
    price: 12499,
    originalPrice: 15999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
    rating: 4.5,
    reviews: 89,
    inStock: true,
    tags: ["outdoor", "sale"],
    createdAt: new Date('2024-08-01').toISOString()
  },
  {
    id: 9,
    name: "Canon EOS R6",
    description: "Full-frame mirrorless camera for photography enthusiasts",
    price: 199999,
    originalPrice: 219999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400",
    rating: 4.8,
    reviews: 78,
    inStock: true,
    tags: ["professional", "featured"],
    createdAt: new Date('2024-08-15').toISOString()
  },
  {
    id: 10,
    name: "Converse Chuck Taylor All Star",
    description: "Classic high-top sneakers in timeless design",
    price: 5299,
    originalPrice: 6299,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400",
    rating: 4.2,
    reviews: 334,
    inStock: true,
    tags: ["classic", "affordable"],
    createdAt: new Date('2024-08-20').toISOString()
  },
  {
    id: 11,
    name: "Apple iPad Air",
    description: "Powerful tablet with M1 chip and stunning Liquid Retina display",
    price: 54900,
    originalPrice: 59900,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    rating: 4.7,
    reviews: 223,
    inStock: true,
    tags: ["new", "tablet"],
    createdAt: new Date('2024-08-25').toISOString()
  },
  {
    id: 12,
    name: "Under Armour Hoodie",
    description: "Comfortable fleece hoodie perfect for workouts and casual wear",
    price: 4599,
    originalPrice: 5999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
    rating: 4.3,
    reviews: 145,
    inStock: true,
    tags: ["comfortable", "sale"],
    createdAt: new Date('2024-08-28').toISOString()
  }
];

const dummyCategories = [
  { id: 1, name: "Electronics", count: 6 },
  { id: 2, name: "Shoes", count: 3 },
  { id: 3, name: "Clothing", count: 3 }
];

const initialState = {
  items: dummyProducts,
  categories: dummyCategories,
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: [0, 250000],
    sortBy: 'name',
    searchTerm: ''
  },
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: dummyProducts.length,
    itemsPerPage: 12
  }
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false
      state.items = action.payload.products
      state.pagination = {
        ...state.pagination,
        ...action.payload.pagination
      }
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    setCategoriesSuccess: (state, action) => {
      state.categories = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      state.pagination.currentPage = 1 // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        priceRange: [0, 1000],
        sortBy: 'name',
        searchTerm: ''
      }
      state.pagination.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload
    },
    clearError: (state) => {
      state.error = null
    }
  },
})

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  setSelectedProduct,
  setCategoriesSuccess,
  setFilters,
  clearFilters,
  setCurrentPage,
  clearError
} = productsSlice.actions

export default productsSlice.reducer