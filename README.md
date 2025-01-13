# FSHIP Project

The **FSHIP Project** is a web application designed to generate shipping labels by integrating with a backend API. Users can input a waybill number to fetch and display shipping details, including dimensions, weight, payment status, and product information. Built with **React.js** (frontend) and **Express.js** (backend), the application is designed for ease of use and efficient setup.

---

## Features

- **Shipping Label Generation**:
  - Fetch shipping details using a waybill number.
  - Display shipment details, including dimensions, weight, and payment status.
  - Show product details, including quantity, price, and taxes.
- **User-Friendly Interface**:
  - Simple and intuitive form for entering the waybill number.
  - Clear display of shipping label details.
- **Error Handling**:
  - Display error messages for invalid waybill numbers or API failures.

---

## Technologies Used

### Frontend
- **React.js**
- **Axios** for API requests.
- **Tailwind CSS** for styling.

### Backend
- **Express.js**
- **Axios** for making requests to the FSHIP API.
- **CORS** for enabling cross-origin requests.

### Deployment
- **Vercel** for frontend deployment.
- **Render** for backend deployment.

---

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/swaraj29/FSHIP.git
   cd FSHIP
Install Dependencies:
npm install
Set Up Environment Variables:

For the backend, create a .env file in the root directory and add the following:
# Backend Configuration
CLIENT_URL=https://fship-three.vercel.app
PORT=3000
For the frontend, create a .env file in the root directory and add the following:
Run the Development Server:
For the backend:
node index.js
For the frontend:
npm run dev
Access the Application:

Frontend: http://localhost:5173

Backend: http://localhost:3000

Generating a Waybill
To generate a waybill, hit the following API endpoint:

API Endpoint
POST https://fship.onrender.com/api/create-forward-order

Request Body

Send the following data in JSON format:
{
  "customer_Name": "John Doe",
  "customer_Mobile": "9876543210",
  "customer_Emailid": "john.doe@example.com",
  "customer_Address": "123, Brigade Road",
  "landMark": "Near Forum Mall",
  "customer_Address_Type": "Home",
  "customer_PinCode": "560034",
  "customer_City": "Bangalore",
  "orderId": "ORD123456",
  "invoice_Number": "INV123456",
  "payment_Mode": 1,
  "express_Type": "surface",
  "is_Ndd": 0,
  "order_Amount": 1000,
  "tax_Amount": 100,
  "extra_Charges": 50,
  "total_Amount": 1150,
  "cod_Amount": 1150,
  "shipment_Weight": 1.5,
  "shipment_Length": 10,
  "shipment_Width": 10,
  "shipment_Height": 10,
  "volumetric_Weight": 0.2,
  "latitude": 12.9716,
  "longitude": 77.5946,
  "pick_Address_ID": 10758,
  "products": [
    {
      "productId": "PROD123",
      "productName": "Sample Product",
      "unitPrice": 500,
      "quantity": 2,
      "productCategory": "Electronics",
      "hsnCode": "123456",
      "sku": "SKU123",
      "taxRate": 18,
      "productDiscount": 0
    }
  ],
  "courierId": 9
}
Response
If the request is successful, the API will return:

json
{
  "route_code": "",
  "order_status": "success",
  "apiorderid": 4288709,
  "waybill": "FSPC0004288709",
  "status": true,
  "response": "Order placed successfully"
}
Testing Waybill Numbers
For testing purposes, use the following waybill numbers:

FSPC0004288709

FSPC0004288710

FSPC0004288711

FSPC0004288712

FSPC0004288713

Public URLs for Testing
Frontend Deployed Link: https://fship-three.vercel.app/

Backend Deployed Link: https://fship.onrender.com
Public URLs for Testing
Frontend Deployed Link: https://fship-three.vercel.app/

Backend Deployed Link: https://fship.onrender.com
Conclusion
The FSHIP Project provides an efficient solution for generating shipping labels by integrating with a backend API. The application is designed for easy setup and usage, with an intuitive interface and modern web technologies. It is deployed on Vercel (frontend) and Render (backend) for public access.

