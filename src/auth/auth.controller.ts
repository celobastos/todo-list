import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // Define o prefixo para as rotas de autenticação
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login') // Mapeia a rota POST /auth/login
  async login(@Body() loginDto: { email: string; senha: string }) {
    try {
      return this.authService.login(loginDto); // Chama o AuthService para gerar o token JWT
    } catch (error) {
      throw new UnauthorizedException('Email ou senha incorretos');
    }
  }
}
