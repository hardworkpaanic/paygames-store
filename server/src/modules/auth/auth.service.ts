import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 20;
  EXPIRE_DAY_ACCESS_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';
  ACCESS_TOKEN_NAME = 'accessToken';
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string) {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (!user) {
        return null;
      }

      const tokens = await this.issueTokens(user.id);
      return { tokens, user };
    } catch (error) {
      throw new BadRequestException('Invalid credentials', error);
    }
  }

  async register(email: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      return user;
    }

    const newUser = await this.userService.create({
      email,
      name: email,
      balance: 0,
    });

    const tokens = await this.issueTokens(newUser.id);
    return { tokens, user: newUser };
  }

  async logout() {}

  private async issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = await this.jwt.signAsync(data, {
      expiresIn: '1d',
    });

    const refreshToken = await this.jwt.signAsync(data, {
      expiresIn: '20d',
    });

    return { accessToken, refreshToken };
  }
}
