import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    // Fetch users from API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users'); // Cambia la URL si es necesario
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleMakeAdmin = async (userId: string) => {
    try {
      await axios.put(`/api/users/${userId}/make-admin`); // Endpoint para actualizar el rol del usuario
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: 'admin' } : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <span>{user.username} - {user.role}</span>
            {user.role !== 'admin' && (
              <button onClick={() => handleMakeAdmin(user.id)}>Make Admin</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
