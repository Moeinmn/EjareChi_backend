import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateReq, UserLoginReq } from './dtos/users.dto';
import { Body } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';
import { User, UserType } from '@app/common/decorators';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  //for login api
  @Post('login')
  async loginUser(@Body() userLoginDto: UserLoginReq ) {
    // console.log(user)
    const existingUser = await this.authServices.findeByEmail(
      userLoginDto.email,
    );
    if (!existingUser) {
      return { message: 'user is not found!' };
    }
    
    const resultComapre = await bcrypt.compare(
      userLoginDto.password,
      existingUser.passwordHash,
    );
    if (resultComapre) {
      const cachedToken= await this.authServices.getTokenRedis(userLoginDto.email);
      if(cachedToken){
        console.log("use cached token")
        return { access_token: cachedToken };

      }else{
        const token = await this.authServices.generateToken(existingUser.id);
        await this.authServices.setTokenRedis(userLoginDto.email,token)
        console.log("use fresh token")

        return { access_token: token };

      }

    } else {
      return { message: 'password is not match' };
    }
  }

  //for signup api
  @Post('signup')
  async signUpUser(@Body() userCreatDTO: UserCreateReq) {
    const existingUser = await this.authServices.findeByEmail(
      userCreatDTO.email,
    );
    if (existingUser) {
      return { message: 'Email already registered' };
    }

    const userCreated = await this.authServices.creatUser(userCreatDTO);
    const token = await this.authServices.generateToken(userCreated.id);
    await this.authServices.setTokenRedis(userCreatDTO.email,token)
    return { access_token: token };
  }



  @Get('redis')
  async testRedis( @User() user :UserType ){
    console.log(user,"test")
     const result= await this.authServices.getTokenRedis("mahdiyarjfr@gmail.com")
      return result
    // return this.authServices.getData("sss")
  }
}
