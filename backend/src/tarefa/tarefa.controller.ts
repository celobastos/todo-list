import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { Prisma } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tarefas')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: Prisma.TarefaCreateInput,
  @Body('memberId') memberId: number,) {
    return this.tarefaService.createTarefa(data,memberId);
  }

  @Get()
  async findAll() {
    return this.tarefaService.getTarefas();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tarefaService.getTarefaById(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.TarefaUpdateInput) {
    return this.tarefaService.updateTarefa(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.tarefaService.deleteTarefa(Number(id));
  }
}
