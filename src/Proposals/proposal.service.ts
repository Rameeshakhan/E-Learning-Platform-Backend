import { Injectable, Request, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Proposal as ProposalModel } from './proposal.model';
import { Model } from 'mongoose';

@Injectable()
export class ProposalService {
  constructor(@InjectModel('Proposal') private readonly proposalModel: Model<ProposalModel>) {}

  async createProposal(userId: any , reqId: any , amount: number, description: string) {
    const newProposal = new this.proposalModel({
      amount,
      description,
      userID: userId,
      reqID: reqId
    });
    const createdProposal = await newProposal.save();
    return createdProposal;
  }

  async getProposal() {
    const proposals = await this.proposalModel.find().exec();
    return proposals;
  }

  async getSingleProposal(proposalId: string) {
    const proposal = await this.proposalModel.findById(proposalId).exec();
    if (!proposal) {
      throw new NotFoundException('Proposal not found');
    }
    return proposal;
  }

  async updateProposal(proposalId: string, amount: number, description: string) {
    const updatedProposal = await this.proposalModel.findByIdAndUpdate(
      proposalId,
      { amount, description },
      { new: true }
    );
    if (!updatedProposal) {
      throw new NotFoundException('Proposal not found');
    }
    return updatedProposal;
  }

  async deleteProposal(proposalId: string) {
    const deletedProposal = await this.proposalModel.findByIdAndRemove(proposalId);
    if (!deletedProposal) {
      throw new NotFoundException('Proposal not found');
    }
    return deletedProposal;
  }
}
