import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {role, status} from "../service/User/UserEnum";

@Entity({name: 'users'})
@Index(["email", "username"], {unique: true})
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

    @Column({name: "is_disabled", type: "boolean", default: true})
    isDisabled: Boolean

    @CreateDateColumn({name: "created_date"})
    createDate: Date;

    @UpdateDateColumn({name: "updated_date"})
    updatedDate: Date;

    @DeleteDateColumn({name: "deleted_date"})
    deletedDate: Date;
}
