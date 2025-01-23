# ShipFast Backend - User Authentication API

This is the backend implementation for the **ShipFast** project, built using **Node.js** and **Express**. It provides RESTful APIs for user sign-up, sign-in, and profile management. The application uses **SQLite** as the database and follows standard REST principles.

---

## Features
- **User Sign-Up**: Allows users to create an account with a unique username and password.
- **User Sign-In**: Authenticates users and provides a JWT token for secure access.
- **User Profile**: Fetch user details using a valid JWT token.
- **Alive Status Endpoint**: A health check endpoint to confirm the server is running.

---

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/user-kartik/shipfast-backend.git
   cd shipfast-backend
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory and add the following:
   ```bash
   JWT_SECRET=your_secret_key

## Running the Application
Start the server:
```bash
node app.js
