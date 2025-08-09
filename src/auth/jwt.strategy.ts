import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Expect token in Authorization header
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'changeme', // Should match your signing key
    });
  }

  async validate(payload: any) {
    // This is where we attach the payload to req.user
    // payload contains data from AuthService login()
    return { userId: payload.sub, username: payload.username, role: payload.role };
  }
}
