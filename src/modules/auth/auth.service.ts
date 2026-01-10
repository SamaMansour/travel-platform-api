import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from '../users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  // 🔐 LOGIN
  async login(email: string, password: string) {
    const user = await this.usersRepo.findByEmailWithPassword(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const tokens = await this.issueTokens(user._id.toString(), user.role);

    const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersRepo.updateRefreshToken(user._id.toString(), refreshHash);

    return tokens;
  }

  // 🔁 REFRESH (ROTATION)
  async refresh(userId: string, refreshToken: string) {
    const user = await this.usersRepo.findByIdWithRefresh(userId);
    if (!user || !user.refreshTokenHash) {
      throw new UnauthorizedException('Access denied');
    }

    const isValid = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (!isValid) {
      throw new UnauthorizedException('Access denied');
    }

    const tokens = await this.issueTokens(userId, user.role);

    const newHash = await bcrypt.hash(tokens.refreshToken, 10);
    await this.usersRepo.updateRefreshToken(userId, newHash);

    return tokens;
  }

  // 🚪 LOGOUT
  async logout(userId: string) {
    await this.usersRepo.updateRefreshToken(userId, null);
    return { success: true };
  }

  // 🔑 TOKEN ISSUER
  private async issueTokens(userId: string, role: string) {
    const payload = { sub: userId, role };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
