import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'First name cannot be empty' })
  @IsString({ message: 'First name must be a valid string' })
  @ApiProperty({
    example: 'John',
    required: true,
  })
  firstname: string;

  @IsNotEmpty({ message: 'Last name cannot be empty' })
  @IsString({ message: 'Last name must be a valid string' })
  @ApiProperty({
    example: 'Doe',
    required: true,
  })
  lastname: string;

  @IsNotEmpty({ message: 'User name cannot be empty' })
  @IsString({ message: 'User name must be a valid string' })
  @ApiProperty({
    example: 'John.Doe',
    required: true,
  })
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Provided email is not valid' })
  @ApiProperty({
    example: 'john.doe@example.com',
    required: true,
  })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Matches(
    new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$/),
    {
      message:
        'Password must be 8-32 characters long and include at least one uppercase letter, one lowercase letter, and one digit.',
    },
  )
  @ApiProperty({
    example: 'SuperSecret123',
    required: true,
  })
  password: string;

  @IsNotEmpty({ message: 'Gender is required' })
  @IsBoolean({ message: 'Gender can only be true/false' })
  @ApiProperty({
    example: true,
    required: true,
  })
  gender: boolean;
}
