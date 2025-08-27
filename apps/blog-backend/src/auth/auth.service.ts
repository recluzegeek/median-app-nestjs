import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const { email, password } = loginDto;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} does not exists.`);
    }
    const isPasswordValid = user.password === password;

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Email or password is incorrect.`);
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}
