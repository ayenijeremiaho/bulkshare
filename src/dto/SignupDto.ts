import {
    IsEmail,
    IsMobilePhone,
    IsNotEmpty,
    IsString,
    Matches, Max,
    MaxLength,
    Min,
    MinLength,
    ValidateIf
} from "class-validator";
import {Match} from "../service/Utility/match.decarator";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class SignupDto {

    @Expose()
    @IsNotEmpty({message: "First name cannot be empty"})
    @IsString()
    @MinLength(3, {message: "First name too short"})
    @MaxLength(30, {message: "First name too Long"})
    firstName: string;

    @Expose()
    @IsNotEmpty({message: "Last name cannot be empty"})
    @IsString()
    @MinLength(3, {message: "last name too short"})
    @MaxLength(50, {message: "last name too long"})
    lastName: string;

    @Expose()
    @ValidateIf(o => o.phone === '')
    @IsEmail({}, {message: "Invalid Email"})
    email: string;

    @Expose()
    @ValidateIf(o => o.email === '')
    @IsMobilePhone('en-NG', {strictMode: false}, {message: "Invalid Phone No"})
    phone: string;

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
    @IsNotEmpty({message: "Username cannot be empty"})
    @MinLength(5, {message: "Username too short"})
    @MaxLength(20)
    username: string;
}