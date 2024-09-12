/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, BadRequestException } from '@nestjs/common';
import { MembroService } from './membro.service';
import { Prisma } from '@prisma/client';

@Controller('membros')
export class MembroController {
  constructor(private readonly membroService: MembroService) {}

  @Post()
  async createMembro(@Body() data: Prisma.MembroCreateInput) {
    try {
      return await this.membroService.createMembro(data);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async findAll() {
    return this.membroService.getMembros();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.membroService.getMembroById(Number(id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.membroService.deleteMembro(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Prisma.MembroUpdateInput) {
    return this.membroService.updateMembro(Number(id), data);
  }
}
