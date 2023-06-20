import * as mongoose from 'mongoose';

enum statusOptions {
  Open = "open",
  Closed = "closed"
}

export const RequestSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: Object.values(statusOptions), default: statusOptions.Open },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' ,required: true},
});

export interface Request extends mongoose.Document {
  id: string;
  subject: string;
  description: string;
  status: statusOptions;
  userID: string; 
}
