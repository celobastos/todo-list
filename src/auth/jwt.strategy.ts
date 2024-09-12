/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { MembroService } from '../membro/membro.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly membroService: MembroService,
  private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'), 
    });
  }

  async validate(payload: JwtPayload) {
    const membro = await this.membroService.getMembroByEmail(payload.email);
    if (!membro) {
      throw new Error('Usuário não encontrado');
    }
    return membro;
  }
}
