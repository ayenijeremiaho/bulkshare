import {IsEmail, IsMobilePhone, IsNotEmpty} from "class-validator";
import {role} from "../service/User/UserEnum";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class UserDto {

    @Expose()
    id: number;

    @Expose()
    @IsNotEmpty()
    firstName: string;

    @Expose()
    @IsNotEmpty()
    lastName: string;

    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsMobilePhone('en-NG')
    phone: string;

    @Expose()
    @IsNotEmpty()
    username: string;

    @Expose()
    role: role;

    @Expose()
    status: string;

    @Expose()
    isDisabled: Boolean
}
