// Dom Selectors
const weatherForm = document.querySelector('#weather-form');
const cityInput = document.querySelector('#city-input');
const resultContainer = document.querySelector('#weather-result');

// Base URL points strictly to our internal proxy gateway
const PROXY_SERVER_URL = 'http://localhost:3000/api/weather';

weatherForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const cityQuery = cityInput.value.trim();
    if (!cityQuery) return;

    try {
        resultContainer.textContent = 'Fetching localized metrics...';

        // Query our local backend server instead of OpenWeather directly
        const response = await fetch(`${PROXY_SERVER_URL}?city=${encodeURIComponent(cityQuery)}`);
        
        if (!response.ok) {
            throw new Error('City lookup failed or system is offline.');
        }

        const weatherData = await response.json();
        
        // Render metrics safely back to the viewport
        renderWeather(weatherData);

    } catch (error) {
        resultContainer.innerHTML = `<span class="text-red-500">${error.message}</span>`;
    }
});

function renderWeather(data) {
    // Basic text transformations to protect against ambient rendering anomalies
    const cityName = data.name;
    const temperature = Math.round(data.main.temp);
    const conditions = data.weather[0].description;

    resultContainer.innerHTML = `
        <div class="p-4 bg-gray-100 rounded-lg">
            <h3 class="text-lg font-medium text-gray-800">${cityName}</h3>
            <p class="text-2xl font-bold text-blue-600 mt-1">${temperature}°C</p>
            <p class="text-sm text-gray-500 mt-1 capitalize">${conditions}</p>
        </div>
    `;
}