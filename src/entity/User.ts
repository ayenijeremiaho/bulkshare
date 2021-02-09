import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import * as jwt from "jsonwebtoken";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    generateToken () {
        return jwt.sign({id: this.id}, "keyToBeSavedInEnv")
    }
}
