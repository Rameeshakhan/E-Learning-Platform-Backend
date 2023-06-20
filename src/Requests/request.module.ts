import {Module} from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { RequestController } from './request.contoller';
import { RequestService } from './request.service';
import { RequestSchema } from './request.model';
import { UserSchema } from '../users/user.model';

@Module({
    imports: [MongooseModule.forFeature([
        {name: "Request" , schema: RequestSchema}, 
        {name: "User" , schema: UserSchema}
    ])],
    controllers: [RequestController],
    providers: [RequestService]
})
export class RequestModule{}