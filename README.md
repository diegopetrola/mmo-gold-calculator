# MMO Coin Calculator

A simple React web app to help RPG players calculate currency operations.
It can be accessed at [mmo-gold-calc](https://diegopetrola.github.io/mmo-gold-calculator/)

## How it works

Many MMOs use a tiered currency system. This calculator assumes the standard conversion rate:

- **1 Gold** = 100 Silver
- **1 Silver** = 100 Bronze
- (1 Gold = 10,000 Bronze)

The app converts all inputs to the base unit (Bronze), performs the operation, and formats the result back into Gold/Silver/Bronze
(Later I might add an option to change this ratios).

The `Use Result` button allows to use the current result as the starting amount of a new calculation.

## Features

- **Addition/Subtraction:** Add or subtract two specific currency amounts (e.g., Price A + Price B).
- **Multiplication:** Multiply a currency amount by a factor (e.g., "I sold 50 of these items").
- **Percentage:** Calculate cuts or taxes (e.g., "Calculate a 5% auction house fee").

## Built With

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Bootstrap](https://react-bootstrap.netlify.app/)
- [gh-pages](https://www.npmjs.com/package/gh-pages/)

## Running Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/diegopetrola/mmo-gold-calculator
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local server:
    ```bash
    npm run dev
    ```
4.  Deployment:
    ```bash
    npm run deploy
    ```
