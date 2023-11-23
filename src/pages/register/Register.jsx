import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import ApiAxios from '../../ApiAxios';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../App';

import './register.css'

function Register() {
const navigate = useNavigate();
const [isAuthenticated, setIsAuthenticated]  = useContext(AuthContext);
const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    const validationErrors = {};
    if (!formData.name.trim()) {
      validationErrors.name = 'Name is required';
    } 

  
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } 

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
   try {

    const form = new FormData();
    form.append('name', formData.name);
    form.append('email', formData.email);
    form.append('password', formData.password);

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const response = await ApiAxios.post('register', formData, { headers });

  console.log( response.data["user"]["name"]);
  console.log( response.data["user"]["email"])
  console.log( response.data["token"]);

  localStorage.setItem('token', response.data.token);
  setToken(response.data.token);
  setIsAuthenticated(true);
  navigate('/');
 
} catch (error) {
  console.error('Error:', error);
}

  };


  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);




  return (
<div className="login-container">
  <div className="row justify-content-center">
    <div className="col-sm-6">


      <h2>Registrar</h2>
      <form onSubmit={handleSubmit}>


      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  </div>
</div>
  );
}

export default Register






