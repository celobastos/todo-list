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
  onSelect: (tarefa: any) => void; 
}

const TaskItem: React.FC<TaskItemProps> = ({ tarefa, onDelete, onSelect }) => {
  return (
    <li className="task-item" onClick={() => onSelect(tarefa)}> 
      <button className="task-item-delete-btn" onClick={(e) => { e.stopPropagation(); onDelete(tarefa.id); }}>x</button>
      <p className="task-item-name">Nome: {tarefa.nome}</p>
      <p className="task-item-priority">Prioridade: {tarefa.prioridade}</p>
      <p className="task-item-status">{tarefa.finalizada ? 'Finalizada' : 'Pendente'}</p>
    </li>
  );
};

export default TaskItem;
