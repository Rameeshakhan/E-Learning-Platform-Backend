import { Controller, Post, Body, Get, Param, Patch, Delete, NotFoundException, Req } from '@nestjs/common';
import { ProposalService } from './proposal.service';
import { Proposal } from './proposal.model';

@Controller('proposal')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) {}

  @Post()
  async createProposal(@Body() body: any, @Req() req: any): Promise<Proposal> {
    const userId: string = req.body.userID;
    const reqId: string = req.body.reqID;
    const createdProposal = await this.proposalService.createProposal(userId, reqId, body.amount, body.description);
    return createdProposal;
  }

  @Get()
  async getProposal(): Promise<Proposal[]> {
    const proposals = await this.proposalService.getProposal();
    return proposals;
  }

  @Get(':id')
  async getSingleProposal(@Param('id') proposalId: string): Promise<Proposal> {
    const proposal = await this.proposalService.getSingleProposal(proposalId);
    return proposal;
  }

  @Patch(':id')
  async updateProposal(
    @Param('id') proposalId: string,
    @Body('amount') amount: number,
    @Body('description') description: string,
  ): Promise<Proposal> {
    const updatedProposal = await this.proposalService.updateProposal(proposalId, amount, description);
    return updatedProposal;
  }

  @Delete(':id')
  async deleteProposal(@Param('id') proposalId: string): Promise<Proposal> {
    const deletedProposal = await this.proposalService.deleteProposal(proposalId);
    if(deletedProposal){
      console.log("Proposal Deleted")
    }else{
      console.log("Error in Deleting Proposal")
    }
    return 
  }
}
