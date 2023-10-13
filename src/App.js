import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import List from './Components/List/List';
import Navbar from './Components/Navbar/Navbar';
import './App.css';

function App() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
  

  return (
    <div className="App">
      
      <Navbar/>
      <h1>Injury Tracking System</h1>
      <Dashboard />
      <List />
      
    </div>
  );
}

export default App;
