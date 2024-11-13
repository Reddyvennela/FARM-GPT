// Mock Data
const mockWeatherData = [
    { time: '12:00', temp: '28°C', condition: 'Sunny' },
    { time: '13:00', temp: '29°C', condition: 'Partly Cloudy' },
    { time: '14:00', temp: '30°C', condition: 'Cloudy' },
    { time: '15:00', temp: '29°C', condition: 'Sunny' },
    { time: '16:00', temp: '28°C', condition: 'Partly Cloudy' },
];

const mockMarketPrices = [
    { crop: 'Wheat', price: '₹2000/quintal', market: 'Local Mandi' },
    { crop: 'Rice', price: '₹2500/quintal', market: 'State Market' },
    { crop: 'Cotton', price: '₹5000/quintal', market: 'Export Market' },
];

const mockSchemes = [
    'PM Kisan Samman Nidhi',
    'Soil Health Card Scheme',
    'Pradhan Mantri Fasal Bima Yojana',
];

// Crop Recommendations
const cropRecommendations = {
    north: ['Wheat', 'Rice', 'Sugarcane'],
    south: ['Rice', 'Cotton', 'Coconut'],
    east: ['Tea', 'Rice', 'Jute'],
    west: ['Cotton', 'Groundnut', 'Jowar']
};

// Initialize Functions
function initWeatherForecast() {
    const weatherContainer = document.getElementById('weather-forecast');
    weatherContainer.innerHTML = '';
    mockWeatherData.forEach(data => {
        const hourDiv = document.createElement('div');
        hourDiv.className = 'weather-hour';
        hourDiv.innerHTML = `
            <div>${data.time}</div>
            <div>${data.temp}</div>
            <div>${data.condition}</div>
        `;
        weatherContainer.appendChild(hourDiv);
    });
}

function initMarketPrices() {
    const pricesContainer = document.getElementById('market-prices');
    pricesContainer.innerHTML = '';
    mockMarketPrices.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.crop}</td>
            <td>${item.price}</td>
            <td>${item.market}</td>
        `;
        pricesContainer.appendChild(row);
    });
}

function initSchemes() {
    const schemesList = document.getElementById('schemes-list');
    schemesList.innerHTML = '';
    mockSchemes.forEach(scheme => {
        const li = document.createElement('li');
        li.textContent = scheme;
        schemesList.appendChild(li);
    });
}

// Chat Functionality
function sendMessage() {
    const input = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    
    if (input.value.trim()) {
        const message = document.createElement('div');
        message.textContent = `You: ${input.value}`;
        chatContainer.appendChild(message);
        input.value = '';

        // Simulate response
        setTimeout(() => {
            const response = document.createElement('div');
            response.textContent = 'FarmAI: Thank you for your question.We will answer to your question shortly.';
            chatContainer.appendChild(response);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1000);
    }
}

// Financial Calculator
function initFinancialCalculator() {
    const form = document.getElementById('financial-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.getElementsByTagName('input');
        const cost = parseFloat(inputs[0].value);
        const yield = parseFloat(inputs[1].value);
        const price = parseFloat(inputs[2].value);
        
        const revenue = yield * price;
        const profit = revenue - cost;
        
        document.getElementById('financial-results').innerHTML = `
            <p>Total Revenue: ₹${revenue}</p>
            <p>Profit: ₹${profit}</p>
            <p>ROI: ${((profit/cost) * 100).toFixed(2)}%</p>
        `;
    });
}

// Region Selection Handler
function initRegionSelection() {
    document.getElementById('region-select').addEventListener('change', function(e) {
        const region = e.target.value;
        if (region) {
            document.getElementById('crop-recommendation').innerHTML = `
                <h4>Recommended Crops:</h4>
                <ul>
                    ${cropRecommendations[region].map(crop => `<li>${crop}</li>`).join('')}
                </ul>
            `;
        }
    });
}

// Pest Detection Form Handler
function initPestDetection() {
    document.getElementById('pest-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Pest detection request submitted! Our AI will analyze the image and provide results shortly.');
    });
}

// Community Functions
function sendRequest() {
    const communitySection = document.getElementById('community-section');
    const requestCard = document.createElement('div');
    requestCard.className = 'request-card';
    requestCard.innerHTML = `
        <p>New connection request sent!</p>
        <small>Pending approval...</small>
    `;
    communitySection.appendChild(requestCard);
}

// Calendar Functions
function addEvent() {
    const date = prompt('Enter event date (YYYY-MM-DD):');
    const description = prompt('Enter event description:');
    
    if (date && description) {
        const calendar = document.getElementById('calendar');
        const eventDiv = document.createElement('div');
        eventDiv.innerHTML = `
            <p><strong>${date}</strong>: ${description}</p>
        `;
        calendar.appendChild(eventDiv);
    }
}

// Initialize Everything
window.onload = function() {
    initWeatherForecast();
    initMarketPrices();
    initSchemes();
    initFinancialCalculator();
    initRegionSelection();
    initPestDetection();
};
