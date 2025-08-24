import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [PrismaModule, UserModule, ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
