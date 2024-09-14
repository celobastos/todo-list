import React, { useState, useEffect } from 'react';
import TaskColumn from '../components/TaskColumn';
import Modal from '../components/Modal';
import CadastroTarefa from './CadastroTarefa';
import { getTarefas, deleteTarefa } from '../services/taskService';
import './Home.css';

const Home: React.FC = () => {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [showCadastro, setShowCadastro] = useState<boolean>(false);
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState<string>('');

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const data = await getTarefas();
        setTarefas(data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    fetchTarefas();
  }, []);

  const handleShowCadastro = (prioridade: string) => {
    setPrioridadeSelecionada(prioridade);
    setShowCadastro(true);
  };

  const handleCloseCadastro = () => {
    setShowCadastro(false);
  };

  const handleAddTarefa = async (novaTarefa: any) => {
    setTarefas([...tarefas, novaTarefa]);
    setShowCadastro(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTarefa(id);
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      alert('Erro ao deletar tarefa.');
    }
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao ToDo List</h1>
      <div className="task-board">
        <TaskColumn
          title="Baixa"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Baixa')}
          onAddTarefa={() => handleShowCadastro('Baixa')}
          onDelete={handleDelete}
        />
        <TaskColumn
          title="Média"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Média')}
          onAddTarefa={() => handleShowCadastro('Média')}
          onDelete={handleDelete}
        />
        <TaskColumn
          title="Alta"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Alta')}
          onAddTarefa={() => handleShowCadastro('Alta')}
          onDelete={handleDelete}
        />
        <TaskColumn
          title="Urgente"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Urgente')}
          onAddTarefa={() => handleShowCadastro('Urgente')}
          onDelete={handleDelete}
        />
        <TaskColumn
          title="SOS"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'SOS')}
          onAddTarefa={() => handleShowCadastro('SOS')}
          onDelete={handleDelete}
        />
      </div>

      {showCadastro && (
        <Modal onClose={handleCloseCadastro}>
          <CadastroTarefa
            prioridadeInicial={prioridadeSelecionada}
            onClose={handleCloseCadastro}
            onAddTarefa={handleAddTarefa}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;
