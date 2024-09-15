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
    <li className="task-item">
      <button className="task-item-delete-btn" onClick={() => onDelete(tarefa.id)}>x</button>
      <p className="task-item-name">Nome: {tarefa.nome}</p>
      <p className="task-item-priority">Prioridade: {tarefa.prioridade}</p>
      <p className="task-item-status">{tarefa.finalizada ? 'Finalizada' : 'Pendente'}</p>
    </li>
  );
};

export default TaskItem;
