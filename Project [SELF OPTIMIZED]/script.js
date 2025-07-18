const currencyApiKey = '152f1e08a7460c3585e2e594'; //  currency API key
const goldApiKey = 'goldapi-6qbsm3x5hjl1-io'; //gold API key

async function loadCurrencies() {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
    const data = await response.json();
    const currencySelects = document.querySelectorAll('select');
    const currencies = Object.keys(data.rates);
    currencySelects.forEach(select => {
        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;
            select.appendChild(option);
        });
    });
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const result = amount * rate;
    const resultElement = document.getElementById('conversion-result');
    resultElement.textContent = `Converted Amount: ${result.toFixed(2)} ${toCurrency}`;
}


async function fetchGoldPrice() {
    const response = await fetch(`https://www.goldapi.io/api/XAU/INR`, {
        method: 'GET',
        headers: {
            'x-access-token': goldApiKey,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    const goldPrice = data.price;
    const goldPriceElement = document.getElementById('gold-price');
    goldPriceElement.textContent = `The current price of gold is ${goldPrice} INR per ounce.`;
}

// this loads currencies when the page loads
window.onload = loadCurrencies;
