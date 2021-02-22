import {IsNotEmpty, IsString, IsUUID, MaxLength, MinLength} from "class-validator";
import {Exclude, Expose} from "class-transformer";

@Exclude()
export class AddShopDto {

    @Expose()
    id: number;

    @Expose()
    @IsNotEmpty({message: "Name cannot be empty"})
    @IsString()
    @MinLength(3, {message: "Name too short"})
    @MaxLength(50, {message: "Name too Long"})
    name: string;

    @Expose()
    @IsNotEmpty({message: "About cannot be empty"})
    @IsString()
    @MinLength(50, {message: "About too short"})
    @MaxLength(250, {message: "About too Long"})
    about: string;

    @Expose()
    @IsNotEmpty({message: "Address cannot be empty"})
    @IsString()
    address: string;

    @Expose()
    companyNo: string;

    @Expose()
    delivery: boolean;

    @Expose()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;
}
