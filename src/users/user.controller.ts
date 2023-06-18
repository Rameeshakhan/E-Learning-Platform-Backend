import { Controller, Post , Body, Get, Param , Patch, Delete, NotAcceptableException} from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}
    
    @Post("signup")
    async userSignUp(
        @Body() body: any,
      ): Promise<any> {
             const signedUp = await this.userService.signUp(body.name , body.email, body.password, body.role);
            if(signedUp){
                return "Successfully Signed Up"
            }else{
                return "Cant Sign Up Email already exist"
            }
      }

      @Post("login")
      async userLogin(@Body() body: any): Promise<string> {
        const isLoggedin = await this.userService.login(body.email, body.password);
        
        if (isLoggedin !== false) {
          return "Successfully logged in";
        } else {
          return "Invalid email or password";
        }
      }

      @Get()
      async getAllUsers(): Promise<any>{
        const users = await this.userService.getUsers()
        return users
      }

      @Post("rP")
      async resetPass(@Body() body: any): Promise<any>{
        await this.userService.resetPassword(body.email , body.password)
      }
}