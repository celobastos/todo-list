import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const EdicaoTarefa: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState('Baixa');
  
  useEffect(() => {
    const fetchTarefa = async () => {
      const response = await api.get(`/tarefas/${id}`);
      const { nome, descricao, prioridade } = response.data;
      setNome(nome);
      setDescricao(descricao);
      setPrioridade(prioridade);
    };
    fetchTarefa();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.put(`/tarefas/${id}`, { nome, descricao, prioridade });
      alert('Tarefa editada com sucesso!');
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
      alert('Erro ao editar tarefa.');
    }
  };

  return (
    <div>
      <h1>Edição de Tarefa</h1>
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EdicaoTarefa;
