import React from 'react'
import { BrowserRouter } from "react-router-dom"
import ReactDOM from 'react-dom/client'
import { UsersContextProvider } from './context/UsersContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UsersContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </UsersContextProvider>
  </BrowserRouter>
)
