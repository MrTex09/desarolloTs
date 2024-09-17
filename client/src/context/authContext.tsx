// src/context/authContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: string;
  // Otros campos que necesites
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      if (token) {
        // Aquí deberías verificar el token y obtener el usuario correspondiente
        // Simulando la obtención del usuario para este ejemplo
        const userData = { id: '1', username: 'admin', role: 'admin' }; // Ejemplo de usuario
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('token', 'example-token'); // Guardar el token en el almacenamiento local
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

