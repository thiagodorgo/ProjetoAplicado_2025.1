import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const handleLogin = () => {
    const fakeUser = { id_colaborador: 1, nome: 'Usuário' };
    localStorage.setItem('token', 'dummy.token.payload');
    localStorage.setItem('user', JSON.stringify(fakeUser));
    navigate('/');
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-xl font-semibold">Login</h1>
        <button onClick={handleLogin} className="w-full bg-green-600 text-white rounded px-4 py-2">Entrar (fake)</button>
      </div>
    </div>
  );
}
