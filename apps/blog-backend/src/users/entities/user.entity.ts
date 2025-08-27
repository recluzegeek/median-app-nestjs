/*
  For property exclusion, https://docs.nestjs.com/techniques/serialization#exclude-properties
*/

import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  @Exclude()
  createdAt: Date;

  @ApiProperty()
  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string | null;
}
