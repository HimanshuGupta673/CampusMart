# College Marketplace

## Overview
College Marketplace is a web application that allows college students to list items for sale and enables interested buyers to contact sellers directly. The platform includes comprehensive user authentication features such as login, signup, and password recovery.

## Features
- **User Authentication**: Secure login, signup, and password recovery processes.
- **Item Listings**: Students can list items for sale with detailed information.
- **Buyer-Seller Communication**: Interested buyers can contact sellers through the provided contact details.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/college-marketplace.git
   cd campusmart
   ```

2. **Install dependencies**
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory with the following variables:
   ```plaintext
   MONGO_URI=your_mongo_connection_string
   ```

4. **Run the application**
   ```bash
   # In the backend directory
   npm start

   # In the frontend directory
   npm start
   ```

## Usage
1. **Sign Up**: Create a new account using your college email.
2. **Login**: Access your account with your email and password.
3. **List Items**: Post items for sale with descriptions and prices.
4. **Browse Listings**: View items listed by other students.
5. **Contact Sellers**: Use the provided contact details to reach out to sellers.

