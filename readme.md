# Next Generation Ecommerce API

(GDSC Project)
This project aims to connect sellers with customers in an interactive and secured ecommerce platform. The API comprises of endpoints related to customer and seller authentication, and the creation, management and deletion of products and orders from the database.

## Technologies Used

1. Node.js
2. Typescript
3. Express and Mongoose
4. MongoDB Atlas (https://www.mongodb.com/atlas)
5. Joi (for server-side schema validation)

## What does the API do?

The API provides a platform with the following functionalities:

1. Sellers and customers can register, log in, and receive unique IDs. Sellers can manage their profiles, change passwords, and delete their accounts.
1. Sellers can create, update, and delete products, but only with a valid seller ID.
1. Products can be read and filtered by anyone based on price and category.
1. Customers can also manage their profiles, change passwords, delete their accounts, and create and update orders.
1. Completing an order automatically updates the relevant products in the products collection.
1. Only admins have the authority to create, update, and delete categories.

# API Documentation

### Management of seller information
This API endpoint comprises of registration, login, update, deletion and altering the password of a new seller.

```javascript
  POST /api/sellers/register
  Content-Type: application/json
  {
      "name": "Raymonds",
      "email": "info@raymonds.com",
      "password": "<password>"
  }
  Usage: Signs up a new seller
```

```javascript
  POST /api/sellers/login
  Content-Type: application/json
  {
      "email": "info@raymonds.com",
      "password": "<password>"
  }
  Usage: Login a seller
```

```javascript
  DELETE /api/sellers/delete-account
  Authorization <sellerId>
  Usage: Delete a seller account

  GET /api/sellers/get-account
  Authorization <sellerId>
  Usage: Get seller account info

  GET /api/sellers/get-sellers
  Usage: Get all sellers
```

### Product Management
This API comprises of endpoints for creation, update and deletion of products. Only a valid seller can create products.

```javascript
    POST /api/products/new
    Authorization <sellerId>
    Content-Type: application/json
    {
        "name": "iPhone 12",
        "price": 799,
        "category": "Electronics",
        "description": "A new iPhone 12",
        "inventoryCount": 100
        "sellerId": "<sellerId>"
    }
    Usage: Create a new product
```

```javascript
    PUT /api/products/:productId
    Authorization <sellerId>
    Content-Type: application/json
    {
        "name": "iPhone 12",
        "price": 599,
        "category": "Electronics",
        "description": "A new iPhone 12",
        "inventoryCount": 95
    }
    Usage: Update a product by its id

    DELETE /api/products/:productId
    Authorization <sellerId>
    Usage: Delete a product by its id

    GET /api/products/:productId
    Authorization <sellerId>
    Usage: Get a product by its id

    GET /api/products
    Authorization <sellerId>
    Usage: Get all products of a seller
```

Filtering products by price and category
```javascript
    GET /api/products/filter/price?maxPrice=1000&minPrice=500
    Usage: Filter products by price

    GET /api/products/filter/category?category=Electronics
    Usage: Filter products by category
```

### Creating Categories
```javascript
    POST /api/categories/new
    Content-Type: application/json
    {
        "name": "Electronics",
        "description": "All electronic items"
    }
    
    Usage: Create a new category and stores it in catogories collection

    PUT /api/categories/:categoryId
    Content-Type: application/json
    {
        "name": "Electronics",
        "description": "All mobile accessories"
    }

    DELETE /api/categories/:categoryName
    Usage: Delete a category by its name

    GET /api/categories/:categoryId
    Usage: Get a category by its id

    GET /api/categories
    Usage: Get all categories
```






