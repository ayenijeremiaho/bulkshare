import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Shop} from "./Shop";

@Entity()
export class Category {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Shop, shop => shop.category)
    shops: Shop[];
}