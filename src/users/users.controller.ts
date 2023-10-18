import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { User } from './schema/users.schema';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.usersService.login(loginDto);
  }

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.usersService.signUp(signUpDto);
  }

  @Put('update/:id')
  async updateUser(@Param('id') id: string, @Body() data: any) {
    return await this.usersService.updateUser(id, data);
  }

  @Delete('remove/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
