import axios from 'axios';

// Crear una instancia de Axios con una URL base
const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// Agregar un interceptor para manejar el token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Definir las interfaces para los datos
interface EquipmentData {
  name: string;
  status: string;
  location: string;
  purchaseDate: string;
  brandId?: string;
  categoryId?: string;
}

interface Brand {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
}

interface Equipment {
  id: string;
  name: string;
  status: string;
  location: string;
  purchaseDate: string;
  brandId?: string;
  categoryId?: string;
}

// Funciones para interactuar con la API
export const fetchEquipments = () => {
  return api.get<Equipment[]>('/equipments').then((res) => res.data);
};

export const fetchEquipmentById = (id: string) => {
  return api.get<Equipment>(`/equipments/${id}`).then((res) => res.data);
};

export const createEquipment = (data: EquipmentData) => {
  return api.post('/equipments', data);
};

export const updateEquipment = (id: string, data: EquipmentData) => {
  return api.put(`/equipments/${id}`, data);
};

export const deleteEquipment = (id: string) => {
  return api.delete(`/equipments/${id}`);
};

// Funciones para manejar marcas
export const createBrand = (data: Brand) => {
  return api.post('/api/brands', data);
};

export const deleteBrand = (id: string) => {
  return api.delete(`/api/brands/${id}`);
};

export const getBrands = () => {
  return api.get<Brand[]>('/api/brands').then((res) => res.data);
};

// Funciones para manejar categorías
export const createCategory = (data: Category) => {
  return api.post('/api/categories', data);
};

export const deleteCategory = (id: string) => {
  return api.delete(`/api/categories/${id}`);
};

export const getCategories = () => {
  return api.get<Category[]>('/api/categories').then((res) => res.data);
};
