import React from 'react';
import './TaskColumn.css';
import TaskItem from './TaskItem';

interface TaskColumnProps {
  title: string;
  tarefas: Array<{ id: number; nome: string; finalizada: boolean; prioridade: string }>;
  onAddTarefa: () => void;
  onDelete: (id: number) => void;
  onSelect: (tarefa: any) => void; 
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tarefas, onAddTarefa, onDelete, onSelect }) => {
  return (
    <div className="task-column-container">
      <div className={`task-column-header ${title.toLowerCase()}`}>{title}</div>
      {tarefas.map((tarefa) => (
        <TaskItem key={tarefa.id} tarefa={tarefa} onDelete={onDelete} onSelect={onSelect} />
      ))}
      <button className="task-column-add-btn" onClick={onAddTarefa}>Adicionar Tarefa</button>
    </div>
  );
};

export default TaskColumn;
