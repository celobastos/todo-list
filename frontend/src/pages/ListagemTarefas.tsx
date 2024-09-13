import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ListagemTarefas: React.FC = () => {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const fetchTarefas = async () => {
      const response = await api.get('/tarefas');
      setTarefas(response.data);
    };
    fetchTarefas();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tarefas/${id}`);
      setTarefas(tarefas.filter((tarefa: any) => tarefa.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro ao deletar tarefa.');
    }
  };

  return (
    <div>
      <h1>Listagem de Tarefas</h1>
      <ul>
        {tarefas.map((tarefa: any) => (
          <li key={tarefa.id}>
            <p>Nome: {tarefa.nome}</p>
            <p>Prioridade: {tarefa.prioridade}</p>
            <p>Finalizada: {tarefa.finalizada ? 'Sim' : 'Não'}</p>
            <button onClick={() => handleDelete(tarefa.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListagemTarefas;
