import { useState } from 'react';
import useAuth from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      alert('Erro ao fazer login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
      <button type="submit">Entrar</button>
    </form>
  );
}