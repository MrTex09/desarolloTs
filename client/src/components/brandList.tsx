/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/BrandList.tsx
import React, { useEffect, useState } from 'react';
import { getBrands } from '../services/api';

interface Brand {
  id: string;
  name: string;
}

const BrandList = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        setError('Error fetching brands');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Brand List</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand.id}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;
