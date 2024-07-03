import React, { useState, useEffect } from 'react';

function CurrencySwap() {
  const [amountFrom, setAmountFrom] = useState('');
  const [amountTo, setAmountTo] = useState('');
  const [currencyFrom, setCurrencyFrom] = useState('USD');
  const [currencyTo, setCurrencyTo] = useState('ETH');
  const [exchangeRates, setExchangeRates] = useState([]);

  useEffect(() => {
    // fetch('/prices.json')
    fetch('https://interview.switcheo.com/prices.json')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setExchangeRates(data);
      })}, []);

      const getExchangeRate = (currency) => {
        for (let i = 0; i < exchangeRates.length; i++) {
          if (exchangeRates[i].currency === currency) {
            return exchangeRates[i].price;
          }
        }
        return 1; 
      };

      const calculateConvertedAmount = (amount, rateFrom, rateTo) => {
        return (amount * rateFrom) / rateTo;
      };
    
      const calculateAmountTo = (amountFrom, currencyFrom, currencyTo) => {
        const rateFrom = getExchangeRate(currencyFrom);
        const rateTo = getExchangeRate(currencyTo);
        const convertedAmount = calculateConvertedAmount(amountFrom, rateFrom, rateTo);
        setAmountTo(convertedAmount.toFixed(6));
      };
    
      const calculateAmountFrom = (amountTo, currencyFrom, currencyTo) => {
        const rateFrom = getExchangeRate(currencyFrom);
        const rateTo = getExchangeRate(currencyTo);
        const convertedAmount = calculateConvertedAmount(amountTo, rateTo, rateFrom);
        setAmountFrom(convertedAmount.toFixed(6));
      };
    
      const handleAmountFromChange = (e) => {
        const amount = e.target.value;
        setAmountFrom(amount);
        calculateAmountTo(amount, currencyFrom, currencyTo);
      };
    
      const handleAmountToChange = (e) => {
        const amount = e.target.value;
        setAmountTo(amount);
        calculateAmountFrom(amount, currencyFrom, currencyTo);
      };
    
      const handleCurrencyFromChange = (e) => {
        const currency = e.target.value;
        setCurrencyFrom(currency);
        calculateAmountTo(amountFrom, currency, currencyTo);
      };
    
      const handleCurrencyToChange = (e) => {
        const currency = e.target.value;
        setCurrencyTo(currency);
        calculateAmountTo(amountFrom, currencyFrom, currency);
      };
    

  return (
    <div className="container">
      <h2>Currency Swap</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div className="column">
            <label>You Send:</label>
            <input
              type="number"
              value={amountFrom}
              onChange={handleAmountFromChange}
              placeholder="Enter amount"
            />
          </div>
          <div className="column">
            <label>Currency:</label>
            <select
              value={currencyFrom}
              onChange={handleCurrencyFromChange}
            >
              {exchangeRates.map(rate => (
                <option key={rate.currency} value={rate.currency}>
                  {rate.currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="swap-button">
          <button>
            Swap
          </button>
        </div>

        <div className="row">
          <div className="column">
            <label>You Get:</label>
            <input
              type="number"
              value={amountTo}
              onChange={handleAmountToChange}
            />
          </div>
          <div className="column">
            <label>Currency:</label>
            <select
              value={currencyTo}
              onChange={handleCurrencyToChange}
            >
              {exchangeRates.map(rate => (
                <option key={rate.currency} value={rate.currency}>
                  {rate.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CurrencySwap;
