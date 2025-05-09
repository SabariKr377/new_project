import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNumber()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsString()
    dob: string

    @ApiProperty()
    @IsNumber()
    @IsString()
    email: string

    @ApiProperty()
    @IsNumber()
    @IsString()
    phone_number: string

    @ApiProperty()
    @IsNumber()
    @IsString()
    gothram: string;
}
