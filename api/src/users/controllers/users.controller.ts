import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { DataAPIResponse } from 'src/types/api-response.type';
import { UserDocument } from '../schemas/user.schema';
import { RoleGuard } from 'src/auth/guards/role.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(
    @Req() request: RequestWithUser,
  ): Promise<DataAPIResponse<UserDocument>> {
    const { user } = request;
    user['password'] = undefined;
    user['status'] = undefined;
    user['created_at'] = undefined;
    user['updated_at'] = undefined;
    return {
      statusCode: HttpStatus.OK,
      data: user,
    };
  }
}
