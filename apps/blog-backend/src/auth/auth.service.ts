import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
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

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(`Email or password is incorrect.`);
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '30m' },
    );
    const refreshToken = this.jwtService.sign(
      {
        userId: user.id,
        type: 'refresh',
      },
      { expiresIn: '14d' },
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string): Promise<AuthEntity> {
    const user = await this.prisma.user.findFirst({ where: { refreshToken } });
    if (!user) {
      throw new UnauthorizedException(`Invalid refresh token`);
    }
    const accessToken = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '30m' },
    );
    return { accessToken, refreshToken };
  }
}
