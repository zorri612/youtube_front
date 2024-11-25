import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Signup.css';

export default function Signup({ role }) {
  const [formData, setFormData] = useState({
    email: '', password: '', name: '', phone: '',
    birthdate: '', idNumber: '', city: '', role: role
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones personalizadas
    if (formData.phone.length < 10) {
      alert("El número de celular debe tener al menos 10 dígitos.");
      return;
    }
    if (formData.idNumber.length < 8) {
      alert("La cédula debe tener al menos 8 dígitos.");
      return;
    }

    try {
      const response = await fetch('https://youtube-back-two.vercel.app/user/signup', {
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
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Crear una cuenta {role === 'admin' ? 'de Administrador' : 'de Usuario'}</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          {/* Campos del formulario */}
          <div className="form-group">
            <label className='words' htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              placeholder="Correo electrónico"
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
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className='words' htmlFor="name">Nombre</label>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
              placeholder="Nombre"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className='words' htmlFor="phone">Celular</label>
            <input
              type="number"
              name="phone"
              id="phone"
              autoComplete="tel"
              required
              placeholder="+57"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className='words' htmlFor="birthdate">Fecha de nacimiento</label>
            <input
              type="date"
              name="birthdate"
              id="birthdate"
              required
              value={formData.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className='words' htmlFor="idNumber">Cédula</label>
            <input
              type="number"
              name="idNumber"
              id="idNumber"
              required
              placeholder="Cédula"
              value={formData.idNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className='words' htmlFor="city">Ciudad</label>
            <select
              name="city"
              id="city"
              required
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Selecciona una ciudad</option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
              <option value="Barranquilla">Barranquilla</option>
              <option value="Cartagena">Cartagena</option>
              <option value="Bucaramanga">Bucaramanga</option>
              <option value="Pereira">Pereira</option>
              <option value="Manizales">Manizales</option>
              <option value="Santa Marta">Santa Marta</option>
              <option value="Cúcuta">Cúcuta</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Registrarse
          </button>
        </form>
        <div className="login-link">
          <Link to="/Form" className="login-button">
            ¿Ya tienes una cuenta? Inicia sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
