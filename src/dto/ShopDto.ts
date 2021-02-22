import {Exclude, Expose} from "class-transformer";
import {UserDto} from "./UserDto";
import {Category} from "../entity/Category";
import {status} from "../service/Utility/enums";
import {Image} from "../entity/Image";

@Exclude()
export class ShopDto {

    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    about: string;

    @Expose()
    address: string;

    @Expose()
    companyNo: string;

    @Expose()
    delivery: boolean;

    @Expose()
    isDisabled: boolean;

    @Expose()
    status: status;

    @Expose()
    totalSold: number;

    @Expose()
    user: UserDto;

    @Expose()
    category: Category;

    @Expose()
    image: Image;


}
