/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembroModule } from './membro/membro.module'; 
import { TarefaModule } from './tarefa/tarefa.module'; 
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MembroModule, TarefaModule,AuthModule], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
