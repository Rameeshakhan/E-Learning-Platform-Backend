import { Injectable, Request, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Request as RequestModel } from './request.model';
import { Model } from 'mongoose';

@Injectable()
export class RequestService {
  constructor(@InjectModel('Request') private readonly requestModel: Model<RequestModel>) {}

  async createRequest(userId: any, subject: string, description: string): Promise<RequestModel> {
    const newRequest = new this.requestModel({
      subject,
      description,
      userID: userId,
    });
    const createdRequest = await newRequest.save();
    return createdRequest;
  }

  async getRequests(): Promise<RequestModel[]> {
    const requests = await this.requestModel.find().exec();
    return requests;
  }

  async getSingleRequest(requestId: string): Promise<RequestModel> {
    const request = await this.requestModel.findById(requestId).exec();
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    return request;
  }

  async updateRequest(requestId: string, subject: string, description: string): Promise<RequestModel> {
    const updatedRequest = await this.requestModel.findByIdAndUpdate(
      requestId,
      { subject, description },
      { new: true }
    ).exec();
    if (!updatedRequest) {
      throw new NotFoundException('Request not found');
    }
    return updatedRequest;
  }

  async deleteRequest(requestId: string): Promise<string> {
    const deletedRequest = await this.requestModel.findByIdAndDelete(requestId).exec();
    if (!deletedRequest) {
      throw new NotFoundException('Request not found');
    }
    return 'Request Deleted';
  }
  
}
