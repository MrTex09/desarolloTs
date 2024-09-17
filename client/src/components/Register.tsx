/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterFormData {
  username: string;
  gmail: string;
  password: string;
  role: 'user'; // Solo 'user' como rol
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    gmail: '',
    password: '',
    role: 'user', // Valor por defecto
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook de navegación

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/register', formData);
      setSuccess('User registered successfully!');
      setError(null);
      // Redirigir al home después del registro exitoso
      setFormData({
        username: '',
        gmail: '',
        password: '',
        role: 'user', // Valor por defecto
      });
      navigate('/equipments'); // Ruta a la que redirigir
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle specific error messages from the server
        const errorMessage = error.response.data.message || 'Error registering user.';
        setError(`Registration failed: ${errorMessage}`);
      } else {
        // Handle unknown errors
        setError('Error registering user. Please try again.');
      }
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gmail">Email:</label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button  className="boton" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
