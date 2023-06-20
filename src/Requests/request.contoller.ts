import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException,  Req } from '@nestjs/common';
import { RequestService } from './request.service';
import { Request } from './request.model';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post()
  async createRequest(@Body() body: any, @Req() req: any): Promise<Request> {
    const userID : string = req.body.userId; 
    const createdRequest = await this.requestService.createRequest(userID, body.subject, body.description);
    if(!createdRequest){
         console.log(`Error Creating Request`)
         return
    }
    return createdRequest
  }

  @Get()
  async getRequests(): Promise<Request[]> {
    const requests = await this.requestService.getRequests();
    return requests;
  }

  @Get(':id')
  async getSingleRequest(@Param('id') id: string): Promise<Request> {
    const request = await this.requestService.getSingleRequest(id);
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    return request;
  }

  @Patch(':id')
  async updateRequest(@Param('id') id: string, @Body() body: any): Promise<Request> {
    const updatedRequest = await this.requestService.updateRequest(id, body.subject, body.description);
    if (!updatedRequest) {
      throw new NotFoundException('Request not found');
    }
    return updatedRequest;
  }

  @Delete(':id')
  async deleteRequest(@Param('id') id: string): Promise<boolean> {
    const deletedRequest = await this.requestService.deleteRequest(id);
    if (!deletedRequest) {
      throw new NotFoundException('Request not found');
    }
    return true;
  }
}
