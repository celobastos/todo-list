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
      const tarefaExistente = await this.prisma.tarefa.findUnique({
        where: { id },
      });
    
      if (!tarefaExistente) {
        throw new Error('Tarefa não encontrada');
      }
    
      if (tarefaExistente.finalizada) {
        throw new Error('Não é possível editar uma tarefa que já foi finalizada.');
      }
    
      const validPrioridades = ['Baixa', 'Média', 'Alta', 'Urgente'];
      if (data.prioridade && typeof data.prioridade === 'string' && !validPrioridades.includes(data.prioridade)) {
        throw new Error('Prioridade deve ser "Baixa", "Média", "Alta" ou "Urgente".');
      }
    
      if (data.finalizada === true && !tarefaExistente.finalizada) {
        data.dataTermino = { set: new Date() }; 
      }
    
     
      return this.prisma.tarefa.update({
        where: { id },
        data: {
          nome: data.nome ? { set: data.nome as string } : undefined,
          descricao: data.descricao ? { set: data.descricao as string } : undefined,
          prioridade: data.prioridade ? { set: data.prioridade as string } : undefined,
          finalizada: data.finalizada,
          dataTermino: data.dataTermino,
          membro: {
            connect: { id: tarefaExistente.membroId },
          },
        },
      });
    }
    
  
  

  async deleteTarefa(id: number): Promise<Tarefa> {
    return this.prisma.tarefa.delete({
      where: { id },
    });
  }
}
