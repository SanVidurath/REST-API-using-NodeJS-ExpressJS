# 📦 Simple Express + MongoDB CRUD API

A basic full-stack-ready RESTful API built using **Express**, **MongoDB**, and **Mongoose** with secure user registration and login using **bcrypt**. Includes full CRUD functionality for managing products.

---

## 📋 Features

- 🧑 User registration and login with password hashing  
- 🛒 Full CRUD operations for products  
- 📁 Modular file structure using MVC principles  
- 🔐 Basic security and validation checks  
- ⚙️ Environment-based configuration  

---

## 🚀 Technologies Used

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- bcrypt for password encryption  
- dotenv for environment management  

---

## 🧪 API Endpoints

### 🔐 Authentication

- `POST /api/auth/register` – Register a user  
- `POST /api/auth/login` – Login a user  

### 📦 Products

- `GET /api/products` – Get all products  
- `GET /api/products/:id` – Get product by ID  
- `POST /api/products` – Create a new product  
- `PUT /api/products/:id` – Update product  
- `DELETE /api/products/:id` – Delete product  

---

## 📌 Notes

- This is a **backend-only** project. You can connect any frontend (React, Angular, etc.) via HTTP requests.
- No authentication middleware is added to the product routes — feel free to extend it with JWT or session-based auth.


