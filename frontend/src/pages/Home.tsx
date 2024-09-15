import React, { useState, useEffect } from 'react';
import TaskColumn from '../components/TaskColumn';
import Modal from '../components/Modal';
import CadastroTarefa from './CadastroTarefa';
import EditTarefaModal from '../components/EditTarefaModal'; 
import { getTarefas, deleteTarefa } from '../services/taskService';
import './Home.css';

const Home: React.FC = () => {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [showCadastro, setShowCadastro] = useState<boolean>(false);
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState<string>('');
  const [tarefaSelecionada, setTarefaSelecionada] = useState<any | null>(null); 
  const [showEditModal, setShowEditModal] = useState<boolean>(false); 

  const memberId = localStorage.getItem('memberId');

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

  const handleTaskSelect = (tarefa: any) => { 
    setTarefaSelecionada(tarefa);
    setShowEditModal(true); 
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTarefaSelecionada(null);
  };

  return (
    <div className="home-container">
      <h1>Bem-vindo ao to-doing</h1>
      <div className="task-board">
        <TaskColumn
          title="Baixa"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Baixa')}
          onAddTarefa={() => handleShowCadastro('Baixa')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect}
        />
        <TaskColumn
          title="Média"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Média')}
          onAddTarefa={() => handleShowCadastro('Média')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect}
        />
        <TaskColumn
          title="Alta"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Alta')}
          onAddTarefa={() => handleShowCadastro('Alta')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect} 
        />
        <TaskColumn
          title="Urgente"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Urgente')}
          onAddTarefa={() => handleShowCadastro('Urgente')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect} 
        />
        <TaskColumn
          title="Feitas"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Feitas')}
          onAddTarefa={() => handleShowCadastro('Feitas')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect} 
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

      {showEditModal && tarefaSelecionada && (
        <EditTarefaModal
          tarefa={tarefaSelecionada}
          onClose={handleCloseEditModal}
          onSave={(updatedTarefa) => {
            setTarefas(tarefas.map(t => (t.id === updatedTarefa.id ? updatedTarefa : t)));
          }}
          memberId={Number(memberId)}
        />
      )}
    </div>
  );
};

export default Home;
