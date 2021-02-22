import {Column, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity()
@Index(["name"], {unique: true})
export class Tag {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;
}