import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import * as jwt from "jsonwebtoken";
import {SignupDto} from "../../dto/SignupDto";
import {validateObject} from "../Utility/errorValidation";
import {plainToClass} from "class-transformer";
import {decrypt} from "../Utility/encryptDecrypt";
import {PasswordDto} from "../../dto/PasswordDto";
import {UserActivation} from "./UserActivation";
import config from "config";

export class UserService {

    private getRepo = () => getRepository(User);

    private static generateToken(user: User) {
        let key = String(config.get("key.value"));
        return jwt.sign({id: user.id, role: user.role, status: user.status}, key, {expiresIn: '1h'});
    }

    async validateNewUser(signupDto: SignupDto) {
        const toCheck = plainToClass(SignupDto, signupDto);
        return await validateObject(toCheck);
    }

    async onBoardUser(user: User){
        const savedUser = await this.save(user);
        const activate = new UserActivation(savedUser);
        await activate.notifyNewUser();
        return savedUser;
    }

    async validateActivation(passwordDto: PasswordDto) {
        try {
            const encrypted = passwordDto.key;
            const decrypted = decrypt(encrypted);
            const username = decrypted.username;
            const dateCreated: Date = decrypted.dateCreated

            const user = await this.getRepo().findOne({username: username});
            const activated = new UserActivation(user);

            let validData = await activated.validateEncryption(encrypted);
            if (!validData) return {"message": "Link has already been used"};

            const today: Date = new Date();
            let diff = (today.valueOf() - dateCreated.valueOf()) / 3600000;
            if (diff > 24) return {"message": "Expired Link"};

            const toCheck = plainToClass(PasswordDto, passwordDto);
            let error = await validateObject(toCheck);
            if (error) return error;

            if (!user) return {"message": "Invalid User"};

            user.isDisabled = false;

            let savedUser = await this.save(user);
            await activated.updateIsUsed(savedUser);

            return null;

        } catch (e) {
            return {"message": e.message};
        }
    }

    async all() {
        return await this.getRepo().find();
    }

    async one(id) {
        return await this.getRepo().findOne(id);
    }

    async update(searchFor: Object, update: Object) {
        //sample searchFor { firstName: "Timber" } and update { firstName: "Jerry" }
        await this.getRepo().update(searchFor, update);
    }

    async save(user: User) {
        return await this.getRepo().save(user);
    }

    async remove(id) {
        let userToRemove = await this.getRepo().findOne(id);
        await this.getRepo().remove(userToRemove);
    }
}