import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createBrowserRouter, RouterProvider , Routes,Route,BrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Cotizar from './pages/cotizar/Cotizar';
import Product from './pages/product/Product';
import Navbar from './Components/navbar/Navbar';
import ErrorPage from './pages/error_page/ErrorPage';
import './App.css';

export const AuthContext=React.createContext();

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider  value={[isAuthenticated, setIsAuthenticated] }>
    <BrowserRouter >
   
    <Navbar />
    <Routes>   
     <Route  path='/' element ={ <Product/> } /> 
     <Route  path='/login'  element ={ <Login/> } /> 
     <Route  path='/register'  element ={ <Register /> } /> 
     <Route  path='/cotizar'  element ={ <Cotizar /> } /> 
     <Route  path='*'  element ={ <ErrorPage /> } /> 
    </Routes>
 
    </BrowserRouter>
    </AuthContext.Provider>

  );
}
export default App;




