const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

const server = (req, res) => {
    res.send("Server is running...");
};

// Routes
app.get("/", server);

// Quote Calculation Route
app.post('/api/quote', (req, res) => {
    const { age, vehicleType, insuranceType } = req.body;

    // Validate inputs
    if (!age || !vehicleType || !insuranceType) {
        return res.json({ success: false, message: 'Please provide all inputs.' });
    }

    // Age validation
    if (age < 18 || age > 100) {
        return res.json({ success: false, message: 'Age must be between 18 and 100.' });
    }

    // Calculate base price
    let basePrice = vehicleType === 'car' ? 5000 : 2000;

    // Calculate age factor
    let ageFactor = 1.0;  // Default value (for age 25-40)
    if (age < 25) {
        ageFactor = 1.2;  // Age < 25
    } else if (age > 40) {
        ageFactor = 0.8;  // Age > 40
    }

    // Calculate insurance type factor
    let insuranceFactor = insuranceType === 'comprehensive' ? 1.5 : 1.0; // Comprehensive: 1.5x, Third-Party: 1x

    // Calculate premium using the formula
    let premium = basePrice + (ageFactor * insuranceFactor * basePrice);

    // Return the calculated premium
    res.json({ success: true, premium });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
