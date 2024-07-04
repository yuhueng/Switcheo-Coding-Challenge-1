import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

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

      const handleSwap = () => {
        setAmountFrom(amountTo);
        setAmountTo(amountFrom);
        setCurrencyFrom(currencyTo);
        setCurrencyTo(currencyFrom);
      };

      const handleImageError = (e) => {
        e.target.src = '/tokens/default.svg';
      };
    

      return (
        <div className="currency-swap-container">
          <h2 className='text-3xl text-center text-white font-mono underline'>Currency Swap</h2>
          <form onSubmit={(e) => e.preventDefault()}>

            <div className="row-container">
              <div className="column-container">
                <label>Sell:</label>
                <input
                  type="number"
                  value={amountFrom}
                  onChange={handleAmountFromChange}
                  placeholder="Enter amount"
                />
              </div>
              <div className="column">
                <label>Currency:</label>
                <div className="currency-selector">
                  <img
                    src={`/tokens/${currencyFrom}.svg`}
                    alt={currencyFrom}
                    className="currency-icon"
                    onError={handleImageError}
                  />
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
            </div>
            <div className="flex justify-center">
              <div className="swap-button">
                <button type="button" onClick={handleSwap}>
                  <FontAwesomeIcon icon={faExchangeAlt} size="2x" className='swap-icon'/>
                </button>
              </div>
            </div>

    
            <div className="row-container">
              <div className="column-container">
                <label>Buy:</label>
                <input
                  type="number"
                  value={amountTo}
                  onChange={handleAmountToChange}
                  placeholder="Enter amount"
                />
              </div>
              <div className="column">
                <label>Currency:</label>
                <div className="currency-selector">
                  <img
                    src={`/tokens/${currencyTo}.svg`}
                    alt={currencyTo}
                    className="currency-icon"
                    onError={handleImageError}
                  />
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
            </div>
          </form>
        </div>
      );
    }

export default CurrencySwap;
