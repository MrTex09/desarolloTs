/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { createBrand, deleteBrand } from '../services/api';

const BrandForm = () => {
  const [brandName, setBrandName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await createBrand({
        name: brandName,
        id: ''
      }); // Ajustado según la API
      setBrandName('');
      // Aquí puedes agregar lógica para actualizar una lista de marcas si es necesario
    } catch (error) {
      setError('Error creating brand');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      await deleteBrand(id);
      // Aquí puedes agregar lógica para actualizar una lista de marcas si es necesario
    } catch (error) {
      setError('Error deleting brand');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          placeholder="Add a new brand"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Brand'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default BrandForm;
