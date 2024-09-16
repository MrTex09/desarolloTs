import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const login = (username: string, password: string) => {
  return api.post('/auth/login', { username, password });
};

export const fetchEquipments = () => {
  return api.get('/equipments');
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createEquipment = (data: any) => {
  return api.post('/equipments', data);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateEquipment = (id: string, data: any) => {
  return api.put(`/equipments/${id}`, data);
};

export const deleteEquipment = (id: string) => {
  return api.delete(`/equipments/${id}`);
};
