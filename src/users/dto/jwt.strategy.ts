// import { UserSchema } from './../schema/users.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../schema/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  UserSchema: any;
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.UserSchema.findById(id);

    if (!user) {
      throw new UnauthorizedException('Login frist to access this endpoints');
    }
    return user;
  }
}
