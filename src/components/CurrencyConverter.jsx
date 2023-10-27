import { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');

  useEffect(() => {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.fastforex.io/fetch-all?api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeRates(response.data.rates);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });
  },  [baseCurrency]);

  return (
    <div>
      <h2>Currency Converter</h2>
      <select onChange={(e) => setBaseCurrency(e.target.value)}>
      <option value="USD">United States Dollar (USD)</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="JPY">JPY</option>
      <option value="AUD">AUD</option>
      <option value="CAD">CAD</option>
      <option value="CHF">CHF</option>
      <option value="CNY">CNY</option>
      <option value="INR">INR</option>
      <option value="SGD">SGD</option>
      <option value="HKD">HKD</option>
      <option value="NZD">NZD</option>
      <option value="SEK">SEK</option>
      <option value="NOK">NOK</option>
      <option value="DKK">DKK</option>
      <option value="KRW">KRW</option>
      <option value="BRL">BRL</option>
      <option value="ZAR">ZAR</option>
      </select>
      <div>
        <h3>Exchange Rates:</h3>
        <ul>
          {Object.keys(exchangeRates).map((currency) => (
            <li key={currency}>
              {currency}: {exchangeRates[currency]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyConverter;
