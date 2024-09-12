/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MembroService } from './membro.service';
import { MembroController } from './membro.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule], 
  controllers: [MembroController], 
  providers: [MembroService], 
  exports: [MembroService],
})
export class MembroModule {}
