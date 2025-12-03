import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await axios.post('/auth/login', form);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {error && <div className="p-2 bg-red-100 text-red-700 mb-2">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} className="w-full input" />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} className="w-full input" />
        <button type="submit" className="w-full btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
