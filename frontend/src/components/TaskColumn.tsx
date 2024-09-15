import React from 'react';
import './TaskColumn.css';  // Import the updated CSS
import TaskItem from './TaskItem';

interface TaskColumnProps {
  title: string;
  tarefas: Array<{ id: number; nome: string; finalizada: boolean; prioridade: string }>;
  onAddTarefa: () => void;
  onDelete: (id: number) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tarefas, onAddTarefa, onDelete }) => {
  return (
    <div className="task-column-container">
      <div className="task-column-header">{title}</div>
      {tarefas.map((tarefa) => (
        <TaskItem key={tarefa.id} tarefa={tarefa} onDelete={onDelete} />
      ))}
      <button className="task-column-add-btn" onClick={onAddTarefa}>Adicionar Tarefa</button>
    </div>
  );
};

export default TaskColumn;
