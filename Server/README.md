# 🛒 Full Stack Ecommerce API

A comprehensive Spring Boot REST API for a full-featured ecommerce platform with JWT authentication, product management, shopping cart, orders, payments, and reviews.

## 🚀 Server Information

- **Base URL**: `http://localhost:5454`
- **Framework**: Spring Boot 3.5.4
- **Java Version**: 17
- **Database**: MySQL 8.0
- **Authentication**: JWT Bearer Token

## 📋 Prerequisites

1. **Java 17+** installed
2. **Maven 3.9+** installed
3. **MySQL 8.0+** running on localhost:3306
4. **Database**: Create database named `ecommerce`

## 🛠️ Setup Instructions

### 1. Database Setup
```sql
-- Create database
CREATE DATABASE ecommerce;

-- Create user (if needed)
CREATE USER 'root'@'localhost' IDENTIFIED BY 'pass@123';
GRANT ALL PRIVILEGES ON ecommerce.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Application Configuration
```properties
# Located in: src/main/resources/application.properties
server.port=5454
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=pass@123
```

### 3. Run the Application
```bash
mvn spring-boot:run
```

## 🔐 Authentication System

### User Registration
```http
POST /auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Signup Success"
}
```

### User Login
```http
POST /auth/signin
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Signin Success"
}
```

## 👤 User Management

### Get User Profile
```http
GET /api/users/profile
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "role": null,
  "mobile": null,
  "address": [],
  "createdAt": "2025-09-19T22:31:19.678"
}
```

## 🛍️ Product Management

### Get All Products (with filters)
```http
GET /api/products?category=men&color=blue&size=M&minPrice=100&maxPrice=1000&minDiscount=10&sort=price_low&stock=in_stock&pageNumber=0&pageSize=10
```

### Get Product by ID
```http
GET /api/products/id/1
```

**Sample Product Response:**
```json
{
  "id": 1,
  "title": "Blue Cotton T-Shirt",
  "description": "Comfortable cotton t-shirt perfect for casual wear",
  "price": 599,
  "discountedPrice": 499,
  "discountPercent": 17,
  "quantity": 50,
  "brand": "FashionBrand",
  "color": "Blue",
  "sizes": [
    {"name": "S", "quantity": 10},
    {"name": "M", "quantity": 20},
    {"name": "L", "quantity": 15},
    {"name": "XL", "quantity": 5}
  ],
  "imageUrl": "https://example.com/images/blue-tshirt.jpg",
  "category": {
    "id": 3,
    "name": "T-Shirts",
    "level": 3
  },
  "ratings": [],
  "reviews": [],
  "numRatings": 0,
  "createdAt": "2025-09-19T22:31:19.678"
}
```

## 🛒 Shopping Cart

### Get User Cart
```http
GET /api/cart/
Authorization: Bearer YOUR_JWT_TOKEN
```

### Add Item to Cart
```http
PUT /api/cart/add
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "size": "M",
  "quantity": 2
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "status": true
}
```

## 📦 Order Management

### Create Order
```http
POST /api/orders/
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "streetAddress": "123 Main Street",
  "city": "New York",
  "state": "NY",
  "zipCode": "10001",
  "mobile": "9876543210"
}
```

### Get User Orders
```http
GET /api/orders/user
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get Order by ID
```http
GET /api/orders/1
Authorization: Bearer YOUR_JWT_TOKEN
```

## 💳 Payment Integration (Razorpay)

### Create Payment Link
```http
POST /api/payments/1
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "payment_link_url": "https://rzp.io/i/xyz123",
  "payment_link_id": "plink_xyz123"
}
```

## ⭐ Reviews & Ratings

### Create Product Review
```http
POST /api/reviews/create
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "review": "Excellent product! Great quality and fast delivery."
}
```

### Get Product Reviews
```http
GET /api/reviews/product/1
```

### Create Product Rating
```http
POST /api/ratings/create
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "productId": 1,
  "rating": 4.5
}
```

### Get Product Ratings
```http
GET /api/ratings/product/1
Authorization: Bearer YOUR_JWT_TOKEN
```

## 👨‍💼 Admin Routes

### Create Product
```http
POST /api/admin/products/
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json

{
  "title": "Blue Cotton T-Shirt",
  "description": "Comfortable cotton t-shirt perfect for casual wear",
  "price": 599,
  "discountedPrice": 499,
  "discountPercent": 17,
  "quantity": 50,
  "brand": "FashionBrand",
  "color": "Blue",
  "size": [
    {"name": "S", "quantity": 10},
    {"name": "M", "quantity": 20},
    {"name": "L", "quantity": 15},
    {"name": "XL", "quantity": 5}
  ],
  "imageUrl": "https://example.com/images/blue-tshirt.jpg",
  "topLevelCategory": "Men",
  "secondLevelCategory": "Clothing",
  "thirdLevelCategory": "T-Shirts"
}
```

### Update Product
```http
PUT /api/admin/products/1/update
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json

{
  "quantity": 100
}
```

### Delete Product
```http
DELETE /api/admin/products/1/delete
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Get All Products (Admin)
```http
GET /api/admin/products/all
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Bulk Create Products
```http
POST /api/admin/products/creates
Authorization: Bearer ADMIN_JWT_TOKEN
Content-Type: application/json

[
  {
    "title": "Red Cotton T-Shirt",
    "description": "Stylish red cotton t-shirt",
    "price": 699,
    "discountedPrice": 599,
    "discountPercent": 14,
    "quantity": 30,
    "brand": "FashionBrand",
    "color": "Red",
    "size": [
      {"name": "M", "quantity": 15},
      {"name": "L", "quantity": 15}
    ],
    "imageUrl": "https://example.com/images/red-tshirt.jpg",
    "topLevelCategory": "Men",
    "secondLevelCategory": "Clothing",
    "thirdLevelCategory": "T-Shirts"
  }
]
```

## 📊 Order Management (Admin)

### Get All Orders
```http
GET /api/admin/orders/
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Confirm Order
```http
PUT /api/admin/orders/1/confirmed
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Ship Order
```http
PUT /api/admin/orders/1/ship
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Deliver Order
```http
PUT /api/admin/orders/1/deliver
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Cancel Order
```http
PUT /api/admin/orders/1/cancel
Authorization: Bearer ADMIN_JWT_TOKEN
```

### Delete Order
```http
DELETE /api/admin/orders/1/delete
Authorization: Bearer ADMIN_JWT_TOKEN
```

## 🧪 Sample Test Data

### Sample Users
```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123"
  },
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "password": "password123"
  },
  {
    "firstName": "Admin",
    "lastName": "User",
    "email": "admin@example.com",
    "password": "admin123"
  }
]
```

### Sample Products
```json
[
  {
    "title": "Blue Cotton T-Shirt",
    "description": "Comfortable cotton t-shirt perfect for casual wear",
    "price": 599,
    "discountedPrice": 499,
    "discountPercent": 17,
    "quantity": 50,
    "brand": "FashionBrand",
    "color": "Blue",
    "size": [
      {"name": "S", "quantity": 10},
      {"name": "M", "quantity": 20},
      {"name": "L", "quantity": 15},
      {"name": "XL", "quantity": 5}
    ],
    "imageUrl": "https://example.com/images/blue-tshirt.jpg",
    "topLevelCategory": "Men",
    "secondLevelCategory": "Clothing",
    "thirdLevelCategory": "T-Shirts"
  },
  {
    "title": "Black Formal Shirt",
    "description": "Elegant black formal shirt for office wear",
    "price": 999,
    "discountedPrice": 799,
    "discountPercent": 20,
    "quantity": 25,
    "brand": "FormalWear",
    "color": "Black",
    "size": [
      {"name": "M", "quantity": 10},
      {"name": "L", "quantity": 10},
      {"name": "XL", "quantity": 5}
    ],
    "imageUrl": "https://example.com/images/black-shirt.jpg",
    "topLevelCategory": "Men",
    "secondLevelCategory": "Clothing",
    "thirdLevelCategory": "Shirts"
  },
  {
    "title": "Blue Denim Jeans",
    "description": "Classic blue denim jeans with perfect fit",
    "price": 1499,
    "discountedPrice": 1199,
    "discountPercent": 20,
    "quantity": 40,
    "brand": "DenimCo",
    "color": "Blue",
    "size": [
      {"name": "30", "quantity": 10},
      {"name": "32", "quantity": 15},
      {"name": "34", "quantity": 10},
      {"name": "36", "quantity": 5}
    ],
    "imageUrl": "https://example.com/images/blue-jeans.jpg",
    "topLevelCategory": "Men",
    "secondLevelCategory": "Clothing",
    "thirdLevelCategory": "Jeans"
  }
]
```

## 🔧 Testing with Postman/Thunder Client

1. **First**, register a new user or login to get JWT token
2. **Copy the JWT token** from the response
3. **Add Authorization header** to all protected routes:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN_HERE`

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if MySQL is running
sudo systemctl status mysql  # Linux
net start mysql              # Windows

# Check MySQL connection
mysql -u root -p
```

### Common Errors
- **403 Forbidden**: Missing or invalid JWT token
- **401 Unauthorized**: Token expired or invalid
- **500 Internal Server Error**: Database connection issues

## 📚 Technology Stack

- **Backend**: Spring Boot 3.5.4
- **Security**: Spring Security + JWT
- **Database**: MySQL 8.0 + Hibernate JPA
- **Payment**: Razorpay Integration
- **Build Tool**: Maven
- **Java Version**: 17

## 🚀 Next Steps

1. **Fix Database Connection**: Ensure MySQL is running with correct credentials
2. **Test API Endpoints**: Use Postman or Thunder Client
3. **Add Sample Data**: Use the admin endpoints to create products
4. **Frontend Integration**: Connect with React/Angular frontend

---

**Happy Coding! 🎉**