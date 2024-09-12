import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Membro } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MembroService {
  constructor(private prisma: PrismaService) {}

  // Função para criar um novo membro
  async createMembro(data: Prisma.MembroCreateInput): Promise<Membro> {
    // Validação de nome
    if (!data.nome || data.nome.length < 5) {
      throw new BadRequestException('Nome deve ter no mínimo 5 caracteres.');
    }

    // Validação de senha
    if (!data.senha || data.senha.length < 3) {
      throw new BadRequestException('Senha deve ter no mínimo 3 caracteres.');
    }

    // Validação de email único
    const membroExistente = await this.prisma.membro.findUnique({
      where: { email: data.email },
    });
    if (membroExistente) {
      throw new BadRequestException('Já existe um membro com esse email.');
    }

    // Hash da senha antes de salvar no banco de dados
    const hashedSenha = await bcrypt.hash(data.senha, 10);

    // Criação do membro no banco de dados com a senha hasheada
    return this.prisma.membro.create({
      data: {
        ...data,
        senha: hashedSenha, // Salva a senha hasheada
      },
    });
  }

  // Função para retornar todos os membros
  async getMembros(): Promise<Membro[]> {
    return this.prisma.membro.findMany();
  }

  // Busca membro pelo email
  async getMembroByEmail(email: string): Promise<Membro | null> {
    return this.prisma.membro.findUnique({
      where: { email },
    });
  }

  // Busca membro pelo ID
  async getMembroById(id: number): Promise<Membro | null> {
    return this.prisma.membro.findUnique({
      where: { id },
    });
  }

  // Função para deletar um membro pelo ID
  async deleteMembro(id: number): Promise<Membro> {
    return this.prisma.membro.delete({
      where: { id },
    });
  }

  // Função para atualizar os dados de um membro
  async updateMembro(id: number, data: Prisma.MembroUpdateInput): Promise<Membro> {
    return this.prisma.membro.update({
      where: { id },
      data,
    });
  }

  // Função para validar a senha fornecida com a senha armazenada (hasheada)
  async validateSenha(senhaInserida: string, senhaArmazenada: string): Promise<boolean> {
    return bcrypt.compare(senhaInserida, senhaArmazenada); // Compara a senha inserida com a senha hasheada
  }
}
