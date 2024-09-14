import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MembroService } from '../membro/membro.service';
import { JwtPayload } from './jwt-payload.interface';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly membroService: MembroService,
    private readonly jwtService: JwtService,
  ) {}

  // Valida o email e senha do membro
  async validateMembro(email: string, senha: string): Promise<any> {
    const membro = await this.membroService.getMembroByEmail(email);
    
    // Verifica se o membro existe e se a senha está correta
    if (membro && await bcrypt.compare(senha, membro.senha)) {
      const { senha: _, ...result } = membro; 
      return result; 
    }
    return null; 
  }

  // Função para realizar o login e gerar o JWT
  async login(membroLogin: any) {
    const membro = await this.validateMembro(membroLogin.email, membroLogin.senha);
  
    if (!membro) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }
  
    const payload: JwtPayload = { email: membro.email, sub: membro.id };
  
    const accessToken = this.jwtService.sign(payload);
    const memberId = membro.id;
  
    console.log('Login successful, memberId:', memberId); // Log the memberId
  
    return {
      access_token: accessToken,
      memberId: memberId, // Ensure this is returned
    };
  }
  
}
