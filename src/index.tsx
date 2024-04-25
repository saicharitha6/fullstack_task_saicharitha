import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Define a function to handle performance metrics
const handlePerfEntry = (metric: any) => {
  // Log the performance metric, or perform other actions
  console.log(metric);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Pass the handlePerfEntry function to reportWebVitals
reportWebVitals(handlePerfEntry);
