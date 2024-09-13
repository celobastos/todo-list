import React, { useState } from 'react';
import api from '../services/api';

const CadastroTarefa: React.FC = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('Baixa');
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post('/tarefas', { nome, descricao, prioridade });
      alert('Tarefa cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar tarefa:', error);
      alert('Erro ao cadastrar tarefa.');
    }
  };

  return (
    <div>
      <h1>Cadastro de Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <div>
          <label>Prioridade</label>
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroTarefa;
