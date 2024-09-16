import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import EquipmentList from './components/EquipmentList';
import EquipmentForm from './components/EquipmentForm';
import Home from './components/Home';
import NotFound from './components/notFound';
import Register from './components/register'; 



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/equipments" element={<EquipmentList />} />
        <Route path="/equipments/new" element={<EquipmentForm />} />
        <Route path="/equipments/edit/:id" element={<EquipmentForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
