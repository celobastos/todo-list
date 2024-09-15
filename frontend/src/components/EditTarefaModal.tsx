import React, { useState } from 'react';
import './EditTarefaModal.css';
import { updateTarefa } from '../services/taskService'; // Importando o serviço de API

interface EditTarefaModalProps {
  tarefa: { id: number; nome: string; descricao?: string; prioridade: string; finalizada: boolean };
  onClose: () => void;
  onSave: (updatedTarefa: any) => void;
  memberId: number;
}

const EditTarefaModal: React.FC<EditTarefaModalProps> = ({ tarefa, onClose, onSave, memberId }) => {
  const [editedTarefa, setEditedTarefa] = useState({
    ...tarefa,
    descricao: tarefa.descricao || '' // Garante que 'descricao' seja sempre uma string
  });
  const [loading, setLoading] = useState(false); // Estado de loading para o feedback

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTarefa({ ...editedTarefa, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true); // Mostra o estado de carregamento
    try {
      await updateTarefa(editedTarefa, memberId); // Chama o serviço API para salvar no banco
      onSave(editedTarefa); // Atualiza o frontend
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
      alert('Erro ao salvar a tarefa.');
    } finally {
      setLoading(false); // Termina o loading
      onClose(); // Fecha o modal
    }
  };

  return (
    <div className="modal-edit-tarefa">
      <div className="modal-content">
        <h2>Editar Tarefa</h2>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={editedTarefa.nome}
            onChange={handleChange}
          />
        </label>
        <label>
          Descrição:
          <input
            type="text"
            name="descricao"
            value={editedTarefa.descricao}
            onChange={handleChange}
          />
        </label>
        <label>
          Prioridade:
          <select
            name="prioridade"
            value={editedTarefa.prioridade}
            onChange={handleChange}
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
            <option value="Urgente">Urgente</option>
          </select>
        </label>
        <label>
          Finalizada:
          <input
            type="checkbox"
            name="finalizada"
            checked={editedTarefa.finalizada}
            onChange={() =>
              setEditedTarefa({ ...editedTarefa, finalizada: !editedTarefa.finalizada })
            }
          />
        </label>
        <button onClick={handleSave} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditTarefaModal;
