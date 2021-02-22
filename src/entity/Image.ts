import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";

@Entity()
export class Image {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    name: string;

    @Column({type: "longblob"})
    data: Buffer;

    @Column({name:"mime_type"})
    mimeType: string

    @ManyToOne(() => Product, product => product.images)
    product: Product;
}