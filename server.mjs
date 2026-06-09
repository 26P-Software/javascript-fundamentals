import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// 1. Initialize environment configurations
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Middlewares
app.use(cors()); // Allows our frontend to communicate with this server
app.use(express.json());

// 3. Secure Proxy Endpoint
app.get('/api/weather', async (req, res) => {
    try {
        const { city } = req.query;

        // Validation guard statement
        if (!city) {
            return res.status(400).json({ error: 'City parameter is required.' });
        }

        // Pull the key completely on the server-side
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

        // Forward the request downstream to OpenWeather
        const response = await fetch(openWeatherUrl);
        
        if (!response.ok) {
            throw new Error(`OpenWeather API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        // Pass the clean data structure back to the frontend browser
        res.json(data);

    } catch (error) {
        console.error('Proxy Engine Error:', error.message);
        res.status(500).json({ error: 'Failed to retrieve weather metrics securely.' });
    }
});

// 4. Start Server Runtime
app.listen(PORT, () => {
    console.log(`[SECURE SERVER RUNNING]: Listening on http://localhost:${PORT}`);
});