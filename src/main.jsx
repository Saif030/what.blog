import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@appwrite.io/pink-icons";
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from "../src/context/AuthContext.jsx"
import DataProvider from './context/DataContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <AuthProvider>
    <DataProvider>
      <App />
    </DataProvider>
   </AuthProvider>
  </BrowserRouter>
)
