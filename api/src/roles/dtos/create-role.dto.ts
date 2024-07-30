import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Name cannot be empty',
  })
  @IsString({
    message: 'Role can only contain string names',
  })
  name: string;

  @IsNotEmpty({
    message: 'Status is required',
  })
  @IsBoolean({
    message: 'Status can only be true/false',
  })
  status: boolean;
}
