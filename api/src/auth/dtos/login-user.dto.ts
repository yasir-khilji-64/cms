import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class LoginUserDto {
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
}
