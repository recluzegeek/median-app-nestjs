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

  async findAll() {
    return await this.prisma.article.findMany({
      where: { published: true },
      include: { author: true },
    });
  }

  async findByAuthorUsername(username: string) {
    return await this.prisma.article.findMany({
      where: {
        author: { username },
        published: true,
      },
    });
  }

  async findDrafts() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!article) {
      throw new NotFoundException(`Article with #${id} id does not exists.`);
    }
    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.ensureArticleExists(id);
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    await this.ensureArticleExists(id);
    return this.prisma.article.delete({
      where: {
        id,
      },
    });
  }

  private async ensureArticleExists(id: number) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(`Article with #${id} id does not exists.`);
    }
    return article;
  }
}
