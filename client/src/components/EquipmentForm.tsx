import React, { useState, useEffect } from 'react';
import { createEquipment, updateEquipment } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const EquipmentForm = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('available');
  const [location, setLocation] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); 

  useEffect(() => {
    if (id) {
      // Cargar los datos del equipo para editar
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, status, location, purchaseDate };

    if (id) {
      await updateEquipment(id, data);
    } else {
      await createEquipment(data);
    }

    navigate('/equipments'); 
  };

  return (
    <div className="container">
      <h2>{id ? 'Editar Equipo' : 'Agregar Equipo'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Estado</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="available">Disponible</option>
            <option value="unavailable">No disponible</option>
          </select>
        </div>
        <div>
          <label>Ubicación</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Adquisición</label>
          <input
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default EquipmentForm;
