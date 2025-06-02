import { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      setUser({ token });
    }
  }, []);

  const getToken = () =>{
    return sessionStorage.getItem("access");
  };

  var autenticado = () => {
    if(sessionStorage.getItem("access")){
        return true
    }else{
        return false
    }
  };

  const login = async (username, password) => {
    const response = await api.post('/auth/login/', { username, password });
    sessionStorage.setItem('access', response.data.access);
    sessionStorage.setItem('refresh', response.data.refresh);
    setUser({ token: response.data.access });
  };

  const logout = () => {
    sessionStorage.removeItem('access');
    sessionStorage.removeItem('refresh');
    setUser(null);
  };

  const register = async (data) => {
    await api.post('/auth/register/', data);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, getToken, autenticado }}>
      {children}
    </AuthContext.Provider>
  );
};
