import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './login.css';
import ApiAxios from '../../ApiAxios';
import { AuthContext } from '../../App';

function Login() {

  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated]  = useContext(AuthContext);


const [formData, setFormData] = useState({
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
   
    form.append('email', formData.email);
    form.append('password', formData.password);
    const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const response = await ApiAxios.post('login', formData, { headers });
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
    <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

export default Login;


