import * as mongoose from 'mongoose';

enum UserRole {
  Student = 'Student',
  Tutor = 'Tutor',
  Admin = 'Admin',
}

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), required: true },
  token: { type: String }, 
});

export interface User extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  token: string;
}

export default mongoose.model<User>('User', UserSchema);
