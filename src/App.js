import React from 'react';
import Home from '../src/components/Home/Home.js'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Home/>
      </header>
        <ToastContainer/>
    </div>
  );
}

export default App;
