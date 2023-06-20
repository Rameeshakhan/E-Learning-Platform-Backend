import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signUp(name: string, email: string, password: string, role: string) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return false;
    } else {
      const token = this.generateToken();

      const newUser = new this.userModel({
        name,
        email,
        password,
        role,
        token,
      });

      if (!name || !email || !password || !role) {
        return `Invalid User Details`;
      } else {
        const createdUser = await newUser.save();
        return { id: createdUser.id, token };
      }
    }
  }

  async login(email: string, password: string): Promise<boolean | { id: string; token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || user.password !== password) {
      return false;
    }
    return { id: user.id, token: user.token };
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async getUserById(id: string): Promise<User | undefined> {
    const user = await this.userModel.findById(id).exec();
    return user;
  }

  async deleteUserById(id: string): Promise<boolean> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return true;
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return false;
    } else {
      user.password = newPassword;
      await user.save();
      return true;
    }
  }

  private generateToken(): string {
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = '30d';
    const token = jwt.sign({}, secretKey, { expiresIn });
    return token;
  }
}
