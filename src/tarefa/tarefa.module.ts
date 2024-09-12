/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { PrismaModule } from '../../prisma/prisma.module'; 

@Module({
  imports: [PrismaModule],
  controllers: [TarefaController],
  providers: [TarefaService], 
})
export class TarefaModule {}
