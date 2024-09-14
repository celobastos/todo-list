import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import api from '../../services/api';
import './Login.css'; 
import assetLogin from '../../assets/assetLogin.png'

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { access_token } = response.data;

      // Save the token in localStorage
      localStorage.setItem('token', access_token);

      navigate('/home');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Email ou senha incorretos.');
    }
  };

  return (
    <div className="main-container">
      {/* Add the "to-doing" title here at the top */}
      <h2 className="to-doing-title">to-doing</h2>

      {/* Flexbox container for the login form and image */}
      <div className="content-container">
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Senha</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            </div>
            <button type="submit" className="btn-login">Login</button>
          </form>
          <div className="signup-link">
            <p>Não tem uma conta? <Link to="/cadastro-membro">Cadastre-se</Link></p>
          </div>
        </div>

        {/* Div for the image beside the login form */}
        <div className="image-container">
          <img src={assetLogin} alt="Imagem de exemplo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
