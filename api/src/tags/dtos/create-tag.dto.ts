import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
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

  @IsOptional()
  @IsBoolean({ message: 'Active status can only be true/false' })
  @ApiProperty({
    required: false,
    example: true,
  })
  active?: boolean;
}
