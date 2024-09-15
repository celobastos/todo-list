import React, { useState, useEffect } from 'react';
import TaskColumn from '../components/TaskColumn';
import Modal from '../components/Modal';
import CadastroTarefa from './CadastroTarefa';
import EditTarefaModal from '../components/EditTarefaModal'; // Adicionando o modal de edição
import { getTarefas, deleteTarefa } from '../services/taskService';
import './Home.css';

const Home: React.FC = () => {
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [showCadastro, setShowCadastro] = useState<boolean>(false);
  const [prioridadeSelecionada, setPrioridadeSelecionada] = useState<string>('');
  const [tarefaSelecionada, setTarefaSelecionada] = useState<any | null>(null); // Estado para a tarefa selecionada
  const [showEditModal, setShowEditModal] = useState<boolean>(false); // Estado para o modal de edição

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

  const handleTaskSelect = (tarefa: any) => { // Função para selecionar tarefa e mostrar modal
    setTarefaSelecionada(tarefa);
    setShowEditModal(true); // Exibir o modal de edição
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setTarefaSelecionada(null);
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
          onSelect={handleTaskSelect} // Passando o onSelect para o TaskColumn
        />
        <TaskColumn
          title="Média"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Média')}
          onAddTarefa={() => handleShowCadastro('Média')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect} // Passando o onSelect para o TaskColumn
        />
        <TaskColumn
          title="Alta"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Alta')}
          onAddTarefa={() => handleShowCadastro('Alta')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect} // Passando o onSelect para o TaskColumn
        />
        <TaskColumn
          title="Urgente"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Urgente')}
          onAddTarefa={() => handleShowCadastro('Urgente')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect} // Passando o onSelect para o TaskColumn
        />
        <TaskColumn
          title="Feitas"
          tarefas={tarefas.filter(tarefa => tarefa.prioridade === 'Feitas')}
          onAddTarefa={() => handleShowCadastro('Feitas')}
          onDelete={handleDelete}
          onSelect={handleTaskSelect} // Passando o onSelect para o TaskColumn
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
        />
      )}
    </div>
  );
};

export default Home;
