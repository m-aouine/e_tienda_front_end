import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import ApiAxios from '../../ApiAxios';

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated]  = useContext(AuthContext);

   async function handleLogout  ()  {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const response = await ApiAxios.post('logout',  { headers });
    console.log(response.data)
    setIsAuthenticated(false);
    navigate('/login');
    localStorage.removeItem('token');
    setToken("");
   
   
  }





  return (
    <div>
     
   
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Tienda</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">




         

          {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">Productos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cotizar">Cotizaciones</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link"  onClick={handleLogout}>Salir</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrar</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Ingresar</Link>
                </li>
              </>
            )}

            
        
         
         

             
                     

           
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;




















