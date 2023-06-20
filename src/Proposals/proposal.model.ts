import * as mongoose from 'mongoose';

enum statusOptions {
  Accepted = "accepted",
  Rejected = "rejected",
  Pending  = "pending"
}

export const ProposalSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: Object.values(statusOptions), default: statusOptions.Pending },
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
  reqID: { type: mongoose.Schema.Types.ObjectId, ref: 'requests', required: true},
});

export interface Proposal extends mongoose.Document {
  id: string;
  amount: number;
  description: string;
  status: statusOptions;
  userID: string; 
  reqID: string;
}
