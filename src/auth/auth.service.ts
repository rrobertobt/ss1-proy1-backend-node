import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    
    if (user && await bcrypt.compare(password, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { 
      sub: user.id, 
      username: user.username,
      email: user.email,
      type: user.type.name
    };

    const accessToken = this.jwtService.sign(payload);
    // For demo purposes, refresh token is similar to access token
    // In production, you'd want to generate a different type of token with longer expiry
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          userType: user.type.name,
          is2faEnabled: user.is_2fa_enabled || false
        },
        requires2fa: false // Set this based on your 2FA implementation
      }
    };
  }
}
