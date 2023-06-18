import { Controller, Post, Body, Get, Param, Patch, Delete, NotAcceptableException ,NotFoundException} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async userSignUp(@Body() body: any): Promise<any> {
    const signedUp = await this.userService.signUp(body.name, body.email, body.password, body.role);
    if (signedUp) {
      return 'Successfully Signed Up';
    } else {
      return 'Can\'t Sign Up, Email already exists';
    }
  }

  @Post('login')
  async userLogin(@Body() body: any): Promise<string> {
    const isLoggedin = await this.userService.login(body.email, body.password);
    if (isLoggedin !== false) {
      return 'Successfully logged in';
    } else {
      return 'Invalid email or password';
    }
  }

  @Get()
  async getAllUsers(): Promise<any> {
    const users = await this.userService.getUsers();
    return users;
  }

  @Get(':id')
  async getSingleUser(@Param('id') id: string): Promise<any> {
    const user = await this.userService.getUserById(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<string> {
    const deleted = await this.userService.deleteUserById(id);
    if (deleted) {
      return 'User deleted successfully';
    } else {
      throw new NotFoundException('User not found');
    }
  }

  @Post('rP')
  async resetPass(@Body() body: any): Promise<any> {
    await this.userService.resetPassword(body.email, body.password);
  }
}
