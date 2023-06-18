import * as mongoose from 'mongoose';

enum UserRole {
  Student = 'student',
  Tutor = 'tutor',
  Admin = 'admin',
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
});

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
