import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth')
  async login(@Body('email') email: string) {
    const login = await this.authService.login(email);

    if (!login) {
      const register = await this.authService.register(email);
      return register;
    }

    return login;
  }

  @Post('logout')
  async logout() {}
}
