# CAMPUSMART

## Overview
CAMPUSmart is a web application designed for college students to list items for sale and facilitate direct communication between buyers and sellers. The platform offers robust user authentication features, including login, signup, and password recovery.

## Features
- **User Authentication**: Secure processes for login, signup, and password recovery.
- **Item Listings**: Students can list items for sale with detailed information.
- **Buyer-Seller Communication**: Buyers can contact sellers through provided contact details.

## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Screenshots
### Login Page
![Login Page](https://github.com/HimanshuGupta673/CampusMart/assets/112652867/eeee466a-fe8e-4265-b1d5-005a8e1be2e8)

### Signup Page
![Signup Page](https://github.com/HimanshuGupta673/CampusMart/assets/112652867/a07d03c7-32df-462c-8b9e-d8650ac02dfe)

### Forgot Password
![Forgot Password](https://github.com/HimanshuGupta673/CampusMart/assets/112652867/174c3893-c368-4e8c-b831-bda65de9b7a7)

### Products Dashboard
![Products Dashboard](https://github.com/HimanshuGupta673/CampusMart/assets/112652867/1abeda23-638d-41b6-be23-4a1b5bf93658)

### Product Description
![Product Description](https://github.com/HimanshuGupta673/CampusMart/assets/112652867/4018b758-6e67-4ab4-ae32-2bed64e6a552)

### Sell Item
![Sell Item](https://github.com/HimanshuGupta673/CampusMart/assets/112652867/99b7b245-715f-4408-a14a-519f8d77a493)
![Sell Item Form](https://github.com/HimanshuGupta673/CampusMart/assets/112652867/7ae0a94f-b21d-4470-9253-e3b6b8f924ef)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HimanshuGupta673/CampusMart.git
   cd CampusMart
   ```

2. **Install dependencies**
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `backend` directory with the following variables:
   ```plaintext
   DB_USERNAME=your_mongo_connection_username
   DB_PASSWORD=your_mongo_connection_password
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
