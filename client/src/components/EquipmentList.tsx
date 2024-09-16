import React, { useState, useEffect } from 'react';
import { fetchEquipments, deleteEquipment } from '../services/api';
import { useNavigate } from 'react-router-dom';


interface Equipment {
  id: string;
  name: string;
  status: string;
  location: string;
}

const EquipmentList = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    const loadEquipments = async () => {
      const response = await fetchEquipments();
      setEquipments(response.data);
    };
    loadEquipments();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteEquipment(id);
    setEquipments(equipments.filter((equipment) => equipment.id !== id)); 
  };

  const handleEdit = (id: string) => {
    navigate(`/equipments/edit/${id}`);
  };

  return (
    <div className="container">
      <h2>Lista de Equipos</h2>
      <button onClick={() => navigate('/equipments/new')}>Agregar Equipo</button>
      <ul>
        {equipments.map((equipment) => (
          <li key={equipment.id}>
            {equipment.name} - {equipment.status} - {equipment.location}
            <button onClick={() => handleEdit(equipment.id)}>Editar</button>
            <button onClick={() => handleDelete(equipment.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EquipmentList;
