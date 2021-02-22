import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'activation'})
export class Activation {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    encrypted: String;

    @Column({name: "is_used", type: "boolean", default: false})
    isUsed: Boolean

    @CreateDateColumn({name: "created_date"})
    createDate: Date;
}