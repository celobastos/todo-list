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
    const memberId = localStorage.getItem('memberId'); 
    const token = localStorage.getItem('token');

    if (!memberId || !token) {
      throw new Error('Member ID ou token não encontrado.');
    }

    await api.delete(`/tarefas/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        memberid: memberId, 
      },
    });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};


export const createTarefa = async (tarefaData: { nome: string; descricao: string; prioridade: string; finalizada: boolean; }, memberId: number) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/tarefas', { ...tarefaData, memberId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  export const updateTarefa = async (tarefaData: { id: number; nome: string; descricao: string; prioridade: string; finalizada: boolean }, memberId: number) => {
    const token = localStorage.getItem('token');
    console.log('memberId: ', memberId);
    const response = await api.put(`/tarefas/${tarefaData.id}`, { ...tarefaData, memberId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });
    console.log(memberId, 'membroId:')
    return response.data;
  };
  
  

  