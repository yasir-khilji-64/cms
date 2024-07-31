import { IsEmail, IsMongoId, IsOptional } from 'class-validator';

export class FindUserDto {
  @IsOptional()
  @IsMongoId({ message: 'Provide a valid MongoDB ID' })
  id?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Provide a valid email address' })
  email?: string;
}
