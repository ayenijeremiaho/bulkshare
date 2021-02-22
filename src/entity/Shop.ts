import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Category} from "./Category";
import {status} from "../service/Utility/enums";
import {User} from "./User";
import {Image} from "./Image";

@Entity()
export class Shop {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    about: string;

    @Column()
    address: String;

    @Column({name: "company_no", nullable: true})
    companyNo: String;

    @Column({default: false})
    delivery: boolean;

    @Column({name: "is_disabled", default: false})
    isDisabled: boolean;

    @Column({type: "enum", enum: status, default: status.UNVERIFIED})
    status: status;

    @Column({name: "total_sold", default: 0})
    totalSold: number;

    @ManyToOne(() => User, user => user.shops)
    user: User;

    @ManyToOne(() => Category, category => category.shops)
    category: Category;

    @OneToOne(() => Image)
    @JoinColumn()
    image: Image;

    @CreateDateColumn({name: "created_date"})
    createdDate: Date;

    @UpdateDateColumn({name: "updated_date"})
    updatedDate: Date;

    @DeleteDateColumn({name: "deleted_date"})
    deletedDate: Date;
}