import {Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'activation'})
export class Activation {

    @PrimaryGeneratedColumn("rowid")
    id: number;

    @Column()
    encrypted: String;

    @Column({name: "is_used", type: "boolean", default: false})
    isUsed: Boolean

    @CreateDateColumn({name: "created_date"})
    createDate: Date;
}