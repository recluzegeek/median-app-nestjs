import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  findAll() {
    return this.prisma.article.findMany({
      where: { published: true },
      include: { author: true },
    });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: number) {
    const user = await this.prisma.article.findUnique({
      where: { id, published: true },
      include: { author: true },
    });
    if (!user) {
      throw new NotFoundException(
        `Article with #${id} id does not exists or currently in DRAFT.`,
      );
    }
    return user;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }
}
