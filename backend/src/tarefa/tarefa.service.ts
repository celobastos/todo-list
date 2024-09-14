/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Tarefa } from '@prisma/client';

@Injectable()
export class TarefaService {
  constructor(private prisma: PrismaService) {}

  async createTarefa(data: Prisma.TarefaCreateInput, memberId: number): Promise<Tarefa> {
   
    if (!data.nome || data.nome.length < 5 || data.nome.length > 50) {
      throw new Error('Nome deve ter entre 5 e 50 caracteres.');
    }
  
    if (data.descricao && data.descricao.length > 140) {
      throw new Error('Descrição deve ter no máximo 140 caracteres.');
    }

    if (data.finalizada === true) {
      data.dataTermino = new Date();
    }
  
    return this.prisma.tarefa.create({
      data: {
        nome: data.nome,
        descricao: data.descricao,
        prioridade: data.prioridade,
        finalizada: data.finalizada,
        dataTermino: data.dataTermino,
        membro: {
          connect: {
            id: memberId,
          },
        },
      },
    });
  }
  
  
  

  async getTarefas(): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany();
  }

  async getTarefaById(id: number): Promise<Tarefa | null> {
    return this.prisma.tarefa.findUnique({
      where: { id },
    });
  }
  async updateTarefa(id: number, data: Prisma.TarefaUpdateInput): Promise<Tarefa> {
    // Verifica se a tarefa já está finalizada e impede alterações se estiver
    const tarefaExistente = await this.prisma.tarefa.findUnique({
      where: { id },
    });
    if (tarefaExistente?.finalizada) {
      throw new Error('Não é possível editar uma tarefa que já foi finalizada.');
    }
  
    // Validação de prioridade ao atualizar
    const validPrioridades = ['Baixa', 'Média', 'Alta'];
    if (data.prioridade && typeof data.prioridade === 'string' && !validPrioridades.includes(data.prioridade)) {
      throw new Error('Prioridade deve ser "Baixa", "Média" ou "Alta".');
    }
  
    // Se a tarefa for marcada como finalizada, registre a data de término
    if (data.finalizada === true && !tarefaExistente.finalizada) {
      data.dataTermino = { set: new Date() }; // Usando `set` para atribuir a data de término
    }
  
    // Atualiza a tarefa com os dados fornecidos
    return this.prisma.tarefa.update({
      where: { id },
      data: {
        ...data,
        nome: typeof data.nome === 'string' ? { set: data.nome } : data.nome, // Corrige a atualização do campo 'nome'
        descricao: typeof data.descricao === 'string' ? { set: data.descricao } : data.descricao, // Corrige a atualização do campo 'descricao'
        prioridade: typeof data.prioridade === 'string' ? { set: data.prioridade } : data.prioridade, // Corrige a atualização do campo 'prioridade'
      },
    });
  }
  

  async deleteTarefa(id: number): Promise<Tarefa> {
    return this.prisma.tarefa.delete({
      where: { id },
    });
  }
}
