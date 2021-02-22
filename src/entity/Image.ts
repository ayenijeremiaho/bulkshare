import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Image {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    url: string;

    @Column({name: "public_id"})
    publicId: string;

    @ManyToOne(() => Product, product => product.images)
    product: Product;
}