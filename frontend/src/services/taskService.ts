import api from './api';

export const getTarefas = async () => {
  try {
    const response = await api.get('/tarefas');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    throw error;
  }
};

export const deleteTarefa = async (id: number) => {
  try {
    await api.delete(`/tarefas/${id}`);
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};
export const createTarefa = async (tarefa: {
    nome: string;
    descricao: string;
    prioridade: string;
    finalizada: boolean;
  }, memberId: string) => {
    try {
      const response = await api.post('/tarefas', {...tarefa, memberId});
      return response.data;
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  };

  