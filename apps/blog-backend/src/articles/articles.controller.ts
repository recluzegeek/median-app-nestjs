// https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('Articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiBearerAuth()
  // TODO: type safe the req
  async create(@Body() createArticleDto: CreateArticleDto, @Req() req: any) {
    return new ArticleEntity(
      await this.articlesService.create({
        ...createArticleDto,
        authorId: req.user.id,
      }),
    );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll() {
    const articles = await this.articlesService.findAll();
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('by-author/:username')
  async findByAuthor(@Param('username') username: string) {
    const articles = await this.articlesService.findByAuthorUsername(username);
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('drafts')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  @ApiBearerAuth()
  async findDrafts() {
    const drafts = await this.articlesService.findDrafts();
    return drafts.map((article) => new ArticleEntity(article));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({ type: ArticleEntity })
  @ApiBearerAuth()
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return new ArticleEntity(
      await this.articlesService.update(id, updateArticleDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ArticleEntity })
  @ApiBearerAuth()
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
