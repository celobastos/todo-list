import React, { useState } from 'react';
import { createTarefa } from '../services/taskService';

interface CadastroTarefaProps {
  prioridadeInicial: string;
  onClose: () => void;
  onAddTarefa: (tarefa: any) => void;
}

const CadastroTarefa: React.FC<CadastroTarefaProps> = ({ prioridadeInicial, onClose, onAddTarefa }) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [prioridade, setPrioridade] = useState(prioridadeInicial);
  const [finalizada, setFinalizada] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const memberId = parseInt(localStorage.getItem('memberId') || '0', 10); 
    if (!memberId) {
      alert('Member ID is missing, please login again.');
      return; 
    }
    
    try {
      const novaTarefa = await createTarefa({ nome, descricao, prioridade, finalizada }, memberId);
      onAddTarefa(novaTarefa);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        alert('Erro ao cadastrar tarefa: ' + error.message);
      } else {
        alert('Erro ao cadastrar tarefa: Ocorreu um erro desconhecido.');
      }
    }
  };
  

  return (
    <div>
      <h1>Cadastro de Tarefa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Descrição</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>
        <div>
          <label>Prioridade</label>
          <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div>
          <label>Finalizada</label>
          <input type="checkbox" checked={finalizada} onChange={(e) => setFinalizada(e.target.checked)} />
        </div>
        <button type="submit">Cadastrar</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
    </div>
  );
};

export default CadastroTarefa;
