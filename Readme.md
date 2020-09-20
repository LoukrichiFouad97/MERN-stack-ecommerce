# E-commerce MERN Stack App

A fully featured e-commerce web app, that supports paypal and google play payments.

## Tech and Features

- JS API (Backend) Development
- React JS (Frontend) Web Development
- Functional Components with React Hooks
- Payment Gateway using Credit Card and PayPal
- Integrate Braintree (A PayPal Company) for Payment Processing
- Implement Advance Searching/Filtering based on Categories
- Implement Advance Searching/Filtering based on Price Range
- Implement Standard Products Search System with Categories option/dropdown
- Implement Authentication based on JWT
- Flexible Private and Admin Routing System
- CRUD with Products and Categories
- File Upload
- LocalStorage (CRUD) to Minimize Requests to Backend
- Sold Products Record into the Database for Further Processing
- User Profile and Update Ability
- Implemented Order Management System by Admin
- Deployed on Digital Ocean's Cloud Servers
- Added a Custom Domain name to the app
- Cloudflare's CDN to serve the app (for speed)
- Cloudflare's SSL to secure the app

## Dependancies

- express
- nodemon
- dotenv
- mongoose
- jsonwebtoken
- express-validator
- body-parser
- cookie-parser
- winston
- debug
- bcrypt
- @babel/core @babel/cli @babel/preset-env @babel/node

## Backend

- user api CRUD
  - Create user
    - API Route: /api/users
    - HTTP Method: POST
  - List all users
    - API Route: /api/users
    - HTTP Method: GET
  - Fetch user
    - API Route: /api/users/:userid
    - HTTP Method: GET
  - Update user
    - API Route: /api/users/:userid
    - HTTP Method: PUT
  - Delete user
    - API Route: /api/users/:userid
    - HTTP Method: DELETE
  - User Sign-in
    - API Route: /auth/signin
    - HTTP Method: POST
  - User Sign-out
    - API Route: /auth/signout
    - HTTP Method: GET

## Frontend
