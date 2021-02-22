import {IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";
import {Match} from "../service/Utility/match.decarator";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class PasswordDto {

    @Expose()
    @IsNotEmpty({message: "Password cannot be empty"})
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password too weak'})
    password: string;

    @Expose()
    @IsNotEmpty({message: "Password Confirmation cannot be empty"})
    @Match('password', {message: "Password do not match"})
    passwordConfirm: string

    @Expose()
    key: String;
}
