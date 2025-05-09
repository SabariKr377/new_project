import { BadRequestException } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-http-bearer";
import { FirebaseService } from "src/firebase/firebase.service";
import { UserService } from "src/user/user.service";

Injectable()
export class BearerStrategy extends PassportStrategy(Strategy){
    constructor(private userService:UserService,
        private firebaseService:FirebaseService
    ){
        super({passReqToCallback:true})
    }
    async validate(req:Request,token:string) {
        try{
            const data= await this.firebaseService.VerifyToken(token)
            
        }catch (error){
         console.log('error',error)
         throw new BadRequestException('Invalid token ');
        }
    }
}