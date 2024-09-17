import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';
import EquipmentForm from './components/EquipmentForm';
import Home from './components/Home'; // Cambiado a Home para coincidir con el nombre del archivo
import NotFound from './components/notFound'; // Cambiado a NotFound para coincidir con el nombre del archivo
import Register from './components/Register';
import Sidebar from './components/sidebar'; // Cambiado a Sidebar para coincidir con el nombre del archivo
import UserList from './components/userList'; // Cambiado a UserList para coincidir con el nombre del archivo
import { useAuth } from './context/authContext'; // Cambiado a AuthContext para coincidir con el nombre del archivo
import './App.css'; // Importa el archivo CSS
import BrandForm from './components/brandForm'; // Cambiado a BrandForm para coincidir con el nombre del archivo
import CategoryForm from './components/categoryForm'; // Cambiado a CategoryForm para coincidir con el nombre del archivo
import BrandList from './components/brandList'; // Cambiado a BrandList para coincidir con el nombre del archivo
import CategoryList from './components/categoryList';

const App = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <Router>
      <div className="app-container">
        {isAdmin && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/equipments" element={<EquipmentList />} />

            {isAdmin && (
              <>
                <Route path="/admin/users" element={<UserList />} />
                <Route path="/admin/equipments" element={<EquipmentList />} />
                <Route path="/admin/equipments/new" element={<EquipmentForm />} />
                <Route path="/admin/equipments/edit/:id" element={<EquipmentForm />} />
                <Route path="/admin/brands/new" element={<BrandForm />} />
                <Route path="/admin/categories/new" element={<CategoryForm />} />
                <Route path="/admin/categories" element={<CategoryList />} />
                <Route path="/admin/brands" element={<BrandList />} />
              </>
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
