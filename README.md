Here is your **clean README (no emojis, professional format)** — just copy and paste:

---

```markdown
# Commerce Mesh System (Microservices E-Commerce Backend)

This project is a microservices-based e-commerce backend application built using Node.js and Express. It demonstrates API Gateway architecture, JWT authentication, and modular backend services.

---

## Architecture

Client → API Gateway → Microservices

- API Gateway (Port 3000)
- Identity Service (Port 5000)
- Product Service (Port 4001)
- Category Service (Port 4002)
- Order Service (Port 4003)

---

## Features

- JWT Authentication
- Role-based access control (Admin / Customer)
- Product management (CRUD operations)
- Category management
- Order creation with stock validation
- API Gateway routing
- Microservices architecture

---

## Project Structure

```

commerce-mesh-system
│
├── gateway-hub
├── identity-service
├── catalog-service
├── taxonomy-service
├── purchase-service
├── run.js
└── README.md

```

---

## Installation

Install dependencies in each service:

```

npm install

```

---

## Run the Project

Start all services:

```

node run.js

```

---

## API Endpoints

### Authentication

POST /auth/login

Request Body:

```

{
"username": "admin",
"password": "admin123"
}

```

---

### Products

GET /products  
POST /products (Admin only)

---

### Categories

GET /categories  
POST /categories (Admin only)

---

### Orders

GET /orders  
POST /orders

---

## Authentication

All protected routes require JWT token in headers:

```

Authorization: Bearer TOKEN

```

---

## Example Workflow

1. Login to get JWT token  
2. Use token to access protected APIs  
3. Admin can create products and categories  
4. Users can place orders  

---

## Technologies Used

- Node.js
- Express.js
- JSON Web Token (JWT)
- http-proxy-middleware

---

## Author

Shamanth M  
Intern - Geekwick TechMedia Services
```

---

If you want, I can also give you a **short version README (one-page)** or **resume project description**.
