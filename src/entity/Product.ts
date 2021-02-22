import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Image} from "./Image";
import {Tag} from "./Tag";

@Entity()
export class Product {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @OneToMany(() => Image, image => image.product)
    images: Image[];

    @Column({name: "total_amount_sold", type: "decimal", precision: 5, scale: 2, default: 0.00})
    totalAmountSold: number;

    @Column({name: "bulk_amount", default: 0})
    bulkAmount: number;

    @Column({name: "bulk_amount_desc", nullable: true})
    bulkAmountDesc: string;

    @Column({name: "amount_in_a_bulk", default: 0})
    amountInABulk: number;

    @Column({name: "amount_in_a_bulk_desc", nullable: true})
    amountInABulkDesc: string;

    @Column({type: "decimal", precision: 5, scale: 2, default: 0.00})
    price: number;

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];

    @CreateDateColumn({name: "created_date"})
    createdDate: Date;

    @UpdateDateColumn({name: "updated_date"})
    updatedDate: Date;

    @DeleteDateColumn({name: "deleted_date"})
    deletedDate: Date;
}