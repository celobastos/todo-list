import { Controller, Get, Post, Body, Param, Delete, Put, Headers } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.TarefaUpdateInput, @Body('memberId') memberId: number) {
    console.log('Member ID no controlador:', memberId);
    return this.tarefaService.updateTarefa(Number(id), data, memberId);
  }
  

  @UseGuards(JwtAuthGuard)
@Delete(':id')
async remove(@Param('id') id: string, @Headers('memberid') memberId: string) {
  console.log('Member ID no controlador (delete):', memberId);
  return this.tarefaService.deleteTarefa(Number(id), Number(memberId));
}

}
