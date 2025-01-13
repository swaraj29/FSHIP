require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

// Enable CORS for frontend-backend communication
app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://fship-three.vercel.app", // Allow requests from the frontend
    credentials: true,
  })
);
app.use(express.json());

// Hardcoded FSHIP API URL and Key
const FSHIP_API_URL = 'https://capi-qc.fship.in';
const FSHIP_API_KEY = '085c36066064af83c66b9dbf44d190d40feec79f437bc1c1cb';

// 1. Get Courier List
app.get('/api/couriers', async (req, res) => {
    try {
        const response = await axios.get(`${FSHIP_API_URL}/api/getallcourier`, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch courier list' });
    }
});

// 2. Add Warehouse
app.post('/api/warehouses', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/addwarehouse`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add warehouse' });
    }
});

// 3. Update Warehouse
app.post('/api/update-warehouse', async (req, res) => {
    console.log('Request Body:', req.body); // Log the request body
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/updatewarehouse`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); // Log the error
        res.status(500).json({ error: 'Failed to update warehouse' });
    }
});

// 4. Create Forward Order
app.post('/api/create-forward-order', async (req, res) => {
    console.log('Request Payload:', req.body); // Log the request payload
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/createforwardorder`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        console.log('API Response:', response.data); // Log the API response
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message); // Log the error
        res.status(500).json({ error: 'Failed to create order', details: error.response ? error.response.data : error.message });
    }
});

// 5. Shipping Label
app.post('/api/shipping-label', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/shippinglabel`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch shipping label' });
    }
});

// 6. Cancel Shipment
app.post('/api/cancel-shipment', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/cancelorder`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to cancel shipment' });
    }
});

// 7. Ship Order
app.post('/api/shiporder', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/shiporder`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to ship order' });
    }
});

// 8. Register Pickup
app.post('/api/register-pickup', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/registerpickup`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register pickup' });
    }
});

// 9. Tracking History
app.post('/api/tracking-history', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/trackinghistory`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tracking history' });
    }
});

// 10. Shipment Current Status
app.post('/api/shipment-summary', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/shipmentsummary`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch shipment summary' });
    }
});

// 11. Rate Calculator
app.post('/api/rate-calculator', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/ratecalculator`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate rates' });
    }
});

// 12. Pincode Serviceability
app.post('/api/pincode-serviceability', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/pincodeserviceability`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to check pincode serviceability' });
    }
});

// 13. Re-attempt Order
app.post('/api/reattempt-order', async (req, res) => {
    try {
        const response = await axios.post(`${FSHIP_API_URL}/api/reattemptorder`, req.body, {
            headers: {
                'Content-Type': 'application/json',
                'signature': FSHIP_API_KEY,
            },
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to re-attempt order' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));