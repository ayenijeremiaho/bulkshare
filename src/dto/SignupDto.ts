import {IsEmail, IsMobilePhone, IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf} from "class-validator";
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
    @ValidateIf(o => o.phone === '' || o.email !== '')
    @IsEmail({}, {message: "Invalid Email"})
    email: string;

    @Expose()
    @ValidateIf(o => o.email === '' || o.phone !== '')
    @IsMobilePhone('en-NG', {strictMode: false}, {message: "Invalid Phone No"})
    phone: string;

    @Expose()
    @IsNotEmpty({message: "Username cannot be empty"})
    @MinLength(5, {message: "Username too short"})
    @MaxLength(20)
    username: string;
}
