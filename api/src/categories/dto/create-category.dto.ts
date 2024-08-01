import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  @IsString({ message: 'Provide a valid string' })
  @ApiProperty({
    required: true,
    example: 'TypeScript',
  })
  name: string;

  @IsOptional()
  @IsString({ message: 'Provide a valid image url' })
  @ApiProperty({
    required: false,
    example: 'https://placehold.co/600x400/png',
  })
  picture?: string;

  @IsNotEmpty({ message: 'Descript cannot be empty' })
  @IsString({ message: 'Provide a valid string' })
  @ApiProperty({
    required: true,
    example: 'This category belongs to all TypeScript posts',
  })
  description?: string;

  @IsOptional()
  @IsBoolean({ message: 'Status can only be true/false' })
  @ApiProperty({
    required: false,
    example: true,
  })
  status?: boolean;
}
