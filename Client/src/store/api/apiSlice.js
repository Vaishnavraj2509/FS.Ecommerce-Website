import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Product', 'Category', 'User', 'Order'],
  endpoints: (builder) => ({
    // Products endpoints
    getProducts: builder.query({
      query: ({ page = 1, category, search, sortBy } = {}) => {
        const params = new URLSearchParams({
          page: page.toString(),
          ...(category && { category }),
          ...(search && { search }),
          ...(sortBy && { sortBy }),
        })
        return `products?${params}`
      },
      providesTags: ['Product'],
    }),
    
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    
    getCategories: builder.query({
      query: () => 'categories',
      providesTags: ['Category'],
    }),
    
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    
    // Orders endpoints
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: 'orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    
    getUserOrders: builder.query({
      query: () => 'orders/user',
      providesTags: ['Order'],
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useLoginMutation,
  useRegisterMutation,
  useCreateOrderMutation,
  useGetUserOrdersQuery,
} = apiSlice