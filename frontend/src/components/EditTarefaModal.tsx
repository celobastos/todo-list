import React, { useState } from 'react';
//import './EditTarefaModal.css'; // Estilos para o modal de edição

interface EditTarefaModalProps {
  tarefa: { id: number; nome: string; descricao?: string; prioridade: string; finalizada: boolean };
  onClose: () => void;
  onSave: (updatedTarefa: any) => void; // Função para salvar a tarefa editada
}

const EditTarefaModal: React.FC<EditTarefaModalProps> = ({ tarefa, onClose, onSave }) => {
  const [editedTarefa, setEditedTarefa] = useState(tarefa); // Estado local para as mudanças na tarefa

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTarefa({ ...editedTarefa, [name]: value });
  };

  const handleSave = () => {
    onSave(editedTarefa); // Chama a função de salvar passando a tarefa editada
    onClose(); // Fecha o modal
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
            value={editedTarefa.descricao || ''}
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
        <button onClick={handleSave}>Salvar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditTarefaModal;
