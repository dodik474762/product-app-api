import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  index(): string {
    return 'Module Auth';
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {
    const result: any = {
      statusCode: 200,
      is_valid: false,
      username: username,
      password: password,
      message: 'Failed',
      data: null,
    };

    const validation = await this.authService.validate({
      username: username,
      password: password,
    });
    if (validation) {
      const compare = await bcrypt.compare(password, validation.password);
      if (compare) {
        const token = await this.authService.login({
          username: username,
          password: password,
        });
        result.data = validation;
        result.token = token;
        result.company = '';
        result.is_valid = true;

        this.authService.update(username);
      } else {
        result.message = 'Username atau Password salah';
        return result;
      }
    } else {
      result.message = 'Username atau Password salah';
      return result;
    }
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwt-test')
  jwtTest(@Request() req): any {
    return {
      statusCode: 200,
      is_valid: true,
      message: 'Success Jwt',
      data: req.user,
    };
  }

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('roles') roles: string,
  ): Promise<any> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    let message = 'Success';

    const params = {
      username: username,
      password: hash,
      roles: roles,
    }
    const userCreate = await this.authService.create(params);

    return {
      statusCode: 200,
      is_valid: true,
      message: message,
      hashPassword: hash,
      username: username,
      roles: roles,
      users: userCreate
    };
  }

  @Post('change-password')
  async changePassword(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<any> {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    let message = 'Success';

    const validation = await this.authService.validate({
      username: username,
      password: password,
    });
    if (validation) {
      this.authService.updatePassword(username, hash);
    } else {
      message = 'Username tidak ditemukan';
    }

    return {
      statusCode: 200,
      is_valid: true,
      message: 'Success',
      hashPassword: hash,
      username: username,
    };
  }

  @Get('logout')
  logout(): any {
    return {
      statusCode: 200,
      is_valid: true,
      message: 'Success Logout',
    };
  }
}
