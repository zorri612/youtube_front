import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
import './styles/adminSignup.css';

export default function SignupAdmin({ role }) {
    const [formData, setFormData] = useState({
      email: '', password: '', role: role
    });
    const navigate = useNavigate();
  

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmitAdmin = async (event) => {
        event.preventDefault();
    
    
        try {
          const response = await fetch('https://ganacomoloco-back.vercel.app/user/signupadmin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert('Usuario creado exitosamente');
            navigate('/Form'); // Redirige al formulario de inicio de sesión
          } else {
            const data = await response.json();
            alert(data.message);
          }
        } catch (error) {
          alert('Error al conectar con el servidor');
        }
      };
    
      return (
        <div className="signup-container-admin">
          <div className="signup-form-container-admin">
            <h2>Crear un Administrador</h2>
            <form className="signup-form-admin" onSubmit={handleSubmitAdmin}>
              {/* Campos del formulario */}
              <div className="form-group">
                <label className='words' htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  placeholder="Correo electrónico Administrativo"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label className='words' htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  required
                  placeholder="Contraseña Administrativa"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-button-admin">
                Registrar Admin
              </button>
            </form>
            <div className="login-link">
              <Link to="/Form" className="login-button">
                Volver a Inicio de Sesion
              </Link>
            </div>
          </div>
        </div>
      );
    }
