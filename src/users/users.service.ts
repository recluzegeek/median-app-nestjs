import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export const hashingRounds = 10;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      throw new ConflictException(
        'A user with this email already exists.',
        'Record Exists',
      );
    }

    const hashedPassword = await hash(createUserDto.password, hashingRounds);
    const userToCreate = {
      ...createUserDto,
      password: hashedPassword,
    };

    return await this.prisma.user.create({ data: userToCreate });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.ensureUserExists(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.ensureUserExists(id);

    const hashedPassword =
      updateUserDto.password &&
      (await hash(updateUserDto.password, hashingRounds));

    const updatedUser = {
      ...updateUserDto,
      ...(hashedPassword && { password: hashedPassword }),
    };

    return await this.prisma.user.update({
      where: { id },
      data: updatedUser,
    });
  }

  async remove(id: number) {
    await this.ensureUserExists(id);

    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  private async ensureUserExists(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} does not exist.`);
    }
    return user;
  }
}
