import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './CadastroMembro.css'; 
import assetCadastro from '../../assets/assetCadastro.png'

const CadastroMembro: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.post('/membros', { email, nome, senha });
      const { access_token } = response.data;

      // Salva o token no localStorage após o cadastro bem-sucedido
      localStorage.setItem('token', access_token);

      // Redireciona para a página inicial
      navigate('/home');
    } catch (error) {
      console.error('Erro ao cadastrar membro:', error);
      alert('Erro ao cadastrar membro.');
    }
  };

  return (
    <div className="main-container">
      <div className="cadastro-container">
        <h1>Cadastro de Membro</h1>
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
          </div>
          <button type="submit" className="btn-cadastro">Cadastrar</button>
        </form>
      </div>

      <div className="image-container">
        <img src={assetCadastro} alt="Imagem de cadastro" />
      </div>
    </div>
  );
};

export default CadastroMembro;
