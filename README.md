# **FSHIP Project**

The **FSHIP Project** is a web application designed to generate shipping labels by integrating with a backend API. Users can input a waybill number to fetch and display shipping details, including dimensions, weight, payment status, and product information. Built with **React.js** (frontend) and **Express.js** (backend), the application is designed for ease of use and efficient setup.

---

## **Features**

- 📦 **Shipping Label Generation**:
  - Fetch shipping details using a waybill number.
  - Display shipment details: dimensions, weight, and payment status.
  - Show product details, including quantity, price, and taxes.
- 🌟 **User-Friendly Interface**:
  - Simple and intuitive form for entering the waybill number.
  - Clear display of shipping label details.
- 🚨 **Error Handling**:
  - Display error messages for invalid waybill numbers or API failures.

---

## **Technologies Used**

### **Frontend**
- ⚛️ **React.js**
- 🌐 **Axios** for API requests.
- 🎨 **Tailwind CSS** for styling.

### **Backend**
- 🌟 **Express.js**
- 🌐 **Axios** for making requests to the FSHIP API.
- 🔐 **CORS** for enabling cross-origin requests.

### **Deployment**
- 🚀 **Vercel** for frontend deployment.
- 🚀 **Render** for backend deployment.

---

## **Setup and Installation**

Follow these steps to set up the project locally:

### **1. Clone the Repository**
```bash
git clone https://github.com/swaraj29/FSHIP.git
cd FSHIP

**2.Install Dependencies
npm install

**3.Set Up Environment Variables
Backend
Create a .env file in the root directory and add the following:

CLIENT_URL=https://fship-three.vercel.app
PORT=3000

Frontend
Create a .env file in the root directory for any required frontend configuration.

**4.Run the Development Server
Backend
node index.js
Frontend
npm run dev


**5.Access the Application
Frontend: http://localhost:5173
Backend: http://localhost:3000

**6.Generating a Waybill
To generate a waybill, use the following API endpoint:

API Endpoint
POST https://fship.onrender.com/api/create-forward-order

Request Body
Send the following data in JSON format:

json
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
If successful, the API returns:

Copy code
{
  "route_code": "",
  "order_status": "success",
  "apiorderid": 4288709,
  "waybill": "FSPC0004288709",
  "status": true,
  "response": "Order placed successfully"
}
Testing Waybill Numbers
Use the following test waybill numbers:

FSPC0004288709
FSPC0004288710
FSPC0004288711
FSPC0004288712
FSPC0004288713
Public URLs

Frontend: https://fship-three.vercel.app/
Backend: https://fship.onrender.com

Conclusion
The FSHIP Project provides an efficient solution for generating shipping labels by integrating with a backend API.
 Designed for ease of use, the application features an intuitive interface and utilizes modern web technologies.
 It is deployed on Vercel (frontend) and Render (backend) for public access.
