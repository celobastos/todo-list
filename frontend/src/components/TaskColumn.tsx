import React from 'react';
import TaskItem from './TaskItem';

interface TaskColumnProps {
  title: string;
  tarefas: Array<{ id: number; nome: string; finalizada: boolean; prioridade: string }>;
  onAddTarefa: () => void;
  onDelete: (id: number) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tarefas, onAddTarefa, onDelete }) => {
  return (
    <div className="task-column">
      <div className="column-header">{title}</div>
      {tarefas.map((tarefa) => (
        <TaskItem key={tarefa.id} tarefa={tarefa} onDelete={onDelete} />
      ))}
      <button onClick={onAddTarefa}>Adicionar Tarefa</button>
    </div>
  );
};

export default TaskColumn;
