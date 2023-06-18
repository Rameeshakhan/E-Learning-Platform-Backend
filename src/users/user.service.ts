import { Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  user: User[];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {
    this.user = [];
  }

  async signUp(name: string, email: string, password: string, role: string) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return false;
    }else{
        const newUser = new this.userModel({
          name,
          email,
          password,
          role,
        });
        if (name === "" || email === "" || password === "" || role === "") {
          return `Invalid User Details`;
        } else {
          const createdUser = await newUser.save();
          const token = this.generateToken(createdUser.id);
          return { id: createdUser.id, token };
        }
    }
  }

  async login(email: string, password: string): Promise<boolean | { id: string, token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user || user.password !== password) {
      return false; 
    }
    const token = this.generateToken(user.id);
    return { id: user.id, token };
  }
  
  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async resetPassword(email: string, newPassword: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email });
  
    if (!user) {
      return false; // User not found
    }
    else{
        user.password = newPassword;
        await user.save();
        return true; // Password reset successful
    }
  }
  

  private generateToken(userId: string): string {
    const secretKey = process.env.SECRET_KEY;
    const expiresIn = '30d';
    const token = jwt.sign({ userId }, secretKey, { expiresIn });
    return token;
  }


}
