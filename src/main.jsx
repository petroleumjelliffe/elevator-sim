import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './ElevatorSim.jsx'
import { extendNumberPrototype } from './utils/formatFloor'

// Extend Number prototype to enable floor.toOrdinal()
extendNumberPrototype(4) // pass in penthouse floor number



ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
)
