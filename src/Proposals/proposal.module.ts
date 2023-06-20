import {Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProposalController } from './proposal.controller';
import { ProposalService } from './proposal.service';
import { ProposalSchema } from './proposal.model';
import { RequestSchema } from '../Requests/request.model';
import { UserSchema } from '../users/user.model';

@Module({
    imports: [MongooseModule.forFeature([
        {name: "Proposal" , schema: ProposalSchema},
        {name: "Request" , schema: RequestSchema}, 
        {name: "User" , schema: UserSchema}
    ])],
    controllers: [ProposalController],
    providers: [ProposalService]
})
export class ProposalModule{}