import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { AuthService } from '../services/auth.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthAPIResponse } from 'src/types/api-response.type';
import { UserDocument } from 'src/users/schemas/user.schema';
import { LoginUserDto } from '../dtos/login-user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(
    @Body() details: RegisterUserDto,
  ): Promise<AuthAPIResponse<UserDocument>> {
    const user = await this.authService.register(details);
    const token = this.authService.getJwtToken({
      id: user['id'],
      role: user['roles'][0]['name'],
    });
    user['password'] = undefined;
    user['status'] = undefined;
    user['created_at'] = undefined;
    user['updated_at'] = undefined;
    return {
      statusCode: HttpStatus.CREATED,
      user,
      token,
    };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  @Post('login')
  async login(
    @Req() request: RequestWithUser,
  ): Promise<AuthAPIResponse<UserDocument>> {
    const { user } = request;
    const token = this.authService.getJwtToken({
      id: user['id'],
      role: user['roles'][0]['name'],
    });
    user['password'] = undefined;
    user['status'] = undefined;
    user['created_at'] = undefined;
    user['updated_at'] = undefined;
    return {
      statusCode: HttpStatus.OK,
      user,
      token,
    };
  }
}
