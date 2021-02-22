import {IsEmail, IsMobilePhone, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf} from "class-validator";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class LoginDto {

    @Expose()
    @IsNotEmpty()
    value: string;

    @Expose()
    @IsNotEmpty()
    password: string;
}
