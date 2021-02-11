import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from "typeorm";
import {UserRole, UserVerificationStatus} from "../service/User/UserEnum";
import {IS_MOBILE_PHONE, IsDate, IsEmail, IsEnum, IsMobilePhone} from "class-validator";

@Entity()
@Index(["email", "username"], {unique: true})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsMobilePhone('en-NG')
    phone: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({type: "enum", enum: UserRole, default: UserRole.BUYER})
    @IsEnum(UserRole)
    role: UserRole;

    @Column({type: "enum", enum: UserVerificationStatus, default: UserVerificationStatus.UNVERIFIED})
    verificationStatus: UserVerificationStatus;

    @Column({type: "boolean", default: true})
    isDisabled: Boolean

    @CreateDateColumn()
    createDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}
