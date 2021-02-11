import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import * as jwt from "jsonwebtoken";
import {validate} from "class-validator";

export class UserService {

    private getRepo = () => getRepository(User);

    private static generateToken(user: User) {
        return jwt.sign({id: user.id, role: user.role, status: user.verificationStatus}, "keyToBeSavedInEnv");
    }

    async validate(user: User) {
        return await validate(User);
    }

    async all() {
        return await this.getRepo().find();
    }

    async one(id) {
        return await this.getRepo().findOne(id);
    }

    async save(user: User) {
        return await this.getRepo().save(user);
    }

    async remove(id) {
        let userToRemove = await this.getRepo().findOne(id);
        await this.getRepo().remove(userToRemove);
    }
}