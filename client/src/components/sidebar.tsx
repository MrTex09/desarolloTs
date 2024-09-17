import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import './Sidebar.css'; // Importa el archivo CSS

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/admin/users">Manage Users</Link>
            </li>
            <li>
              <Link to="/admin/equipments">Manage Equipments</Link>
            </li>
            <li>
              <Link to="/admin/equipments/new">New Equipment</Link>
            </li>           
              <li>
              <Link to="/admin/brands/new">NUEVA marcas</Link>
            </li>      <li>
              <Link to="/admin/brands">marcas</Link>
            </li>       
             <li>
              <Link to="/admin/categories/new">nueva categorias</Link>
              <Link to="/admin/categories">categorias</Link>
            </li>  
          </>
        )}
      </ul>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;
