import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index, JoinColumn,
    OneToMany, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {role, status} from "../service/Utility/Enums";
import {Shop} from "./Shop";
import {Image} from "./Image";

@Entity({name: 'users'})
@Index(["email", "phone", "username"], {unique: true})
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({length: 255, name: "first_name"})
    firstName: string;

    @Column({length: 255, name: "last_name"})
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({type: "enum", enum: role, default: role.BUYER})
    role: role;

    @Column({type: "enum", enum: status, default: status.UNVERIFIED})
    status: status;

    @OneToMany(() => Shop, shop => shop.user)
    shops: Shop[];

    @OneToOne(() => Image)
    @JoinColumn()
    image: Image;

    @Column({name: "is_disabled", type: "boolean", default: true})
    isDisabled: boolean

    @Column({name: "last_login_date", nullable:true})
    lastLoginDate: Date;

    @Column({name: "failed_login_count", default: 0})
    failedLoginCount: number;

    @CreateDateColumn({name: "created_date"})
    createdDate: Date;

    @UpdateDateColumn({name: "updated_date"})
    updatedDate: Date;

    @DeleteDateColumn({name: "deleted_date"})
    deletedDate: Date;
}
