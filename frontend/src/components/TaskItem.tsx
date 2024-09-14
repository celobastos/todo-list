import React from 'react';
import './TaskItem.css';

interface TaskItemProps {
  tarefa: {
    id: number;
    nome: string;
    finalizada: boolean;
    prioridade: string;
  };
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ tarefa, onDelete }) => {
  return (
    <li>
      <p>Nome: {tarefa.nome}</p>
      <p>Prioridade: {tarefa.prioridade}</p>
      <p>{tarefa.finalizada ? 'Finalizada' : 'Pendente'}</p>
      <button onClick={() => onDelete(tarefa.id)}>Deletar</button>
    </li>
  );
};

export default TaskItem;
