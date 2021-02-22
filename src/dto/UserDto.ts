import {role} from "../service/Utility/enums";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class UserDto {

    @Expose()
    id: number;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    email: string;

    @Expose()
    phone: string;

    @Expose()
    username: string;

    @Expose()
    role: role;

    @Expose()
    status: string;

    @Expose()
    isDisabled: Boolean

    @Expose()
    token: String
}
