import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';

import { LoginDto } from './dto/login.dto';

@Injectable()
export class UsersService {
  async findUserById(id: string) {
    return await this.usersSchema.findById(id);
  }
  UsersModule: any;
  constructor(
    @InjectModel(User.name)
    private usersSchema: mongoose.Model<User>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersSchema.find();
    return users;
  }
  async signUp(signUpDto: SignUpDto): Promise<any> {
    const { name, email, password, phone } = signUpDto;
    const userExist = await this.usersSchema.findOne({ email });
    if (userExist) return { data: 'user alrady exist' };
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersSchema.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.usersSchema.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async updateUser(id: string, data: any) {
    const res = await this.usersSchema.findByIdAndUpdate(
      id,
      {
        $set: { ...data },
      },
      { new: true },
    );
    return res;
  }

  async deleteUser(id: string) {
    await this.usersSchema.findByIdAndDelete(id);
    return 'user deleted';
  }
}
