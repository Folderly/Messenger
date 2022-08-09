import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SendDTO {
  @IsString()
  @ApiProperty()
  subject: string;

  @IsString()
  @ApiProperty()
  body: string;

  @IsString()
  @ApiProperty()
  to: string;

  @IsString()
  @ApiProperty()
  threadId: string;

  @IsString()
  @ApiProperty()
  inReplyTo: string;
}
