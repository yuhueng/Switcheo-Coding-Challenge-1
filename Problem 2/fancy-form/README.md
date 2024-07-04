# Currency Swap and Price Table Application

This project is a React application that allows users to swap currencies and view a table of currency prices. The application fetches currency data from a JSON file and provides a user-friendly interface for currency conversion and data display.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Key Functions](#key-functions)

## Features
- **Currency Swap**: Convert amounts between different cryptocurrencies.
- **Price Table**: Display a list of currencies, their prices, and dates fetched from a JSON file.
- **Toggle Table**: Show or hide the price table using a button.
- **Responsive Design**: The layout adjusts based on whether the table is visible or not.

- ## Installation
1. git  clone
2. npm install
3. npm start

## Key Functions

### Header Component (`Header.jsx`)
- **Description**: Contains the button to toggle the visibility of the price table.
- **Props**:
  - `toggleTableVisibility`: A function passed from the parent component to toggle the table's visibility.

### CurrencySwap Component (`CurrencySwap.jsx`)
- **Description**: Allows users to convert amounts between different cryptocurrencies.
- **Key Functions**:
  - **handleAmountFromChange**: Updates the `amountFrom` state and calculates the corresponding `amountTo`.
  - **handleAmountToChange**: Updates the `amountTo` state and calculates the corresponding `amountFrom`.
  - **handleCurrencyFromChange**: Updates the `currencyFrom` state and recalculates the `amountTo`.
  - **handleCurrencyToChange**: Updates the `currencyTo` state and recalculates the `amountTo`.
  - **handleSwap**: Swaps the values of `amountFrom` and `amountTo` and the currencies.

### Table Component (`Table.jsx`)
- **Description**: Fetches and displays a table of currency prices from a JSON file.
- **Key Functions**:
  - **useEffect**: Fetches data from `prices.json` when the component mounts and stores it in the `data` state.
  - **Rendering**: Maps the fetched data to table rows.

### App Component (`App.jsx`)
- **Description**: Manages the visibility of the `Table` component and includes the `Header` and `CurrencySwap` components.
- **Key Functions**:
  - **toggleTableVisibility**: Toggles the `isTableVisible` state to show or hide the table.


# React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
- 
