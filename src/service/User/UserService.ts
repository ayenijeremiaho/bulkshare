import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import * as jwt from "jsonwebtoken";
import {SignupDto} from "../../dto/SignupDto";
import {validateObject} from "../Utility/errorValidation";
import {plainToClass} from "class-transformer";
import {comparePassword, decrypt, hashPassword} from "../Utility/encryptDecrypt";
import {PasswordDto} from "../../dto/PasswordDto";
import {UserActivation} from "./UserActivation";
import {get} from "config";
import {createMessage, notFound} from "../Utility/messages";
import {UserDto} from "../../dto/UserDto";
import {classToClass} from "../Utility/convert";
import {LoginDto} from "../../dto/LoginDto";
import {logger} from "../../utility";
import {role} from "../Utility/enums";

const key = String(get("key.value"));

export class UserService {

    private getRepo = () => getRepository(User);

    async upgradeToSeller(user: User){
        await this.updateWhere({username: user.username}, {role: role.SELLER});
    }

    verifyUserToken(token: string) {
        try {
            return jwt.verify(token, key)
        } catch (e) {
            logger.error(e.message, e);
            return null;
        }
    }

    generateUserToken(user: User) {
        const token = UserService.generateToken(user);

        let userDto = classToClass(user, UserDto);
        userDto.token = token;

        return userDto;
    }

    async verifyFailedLoginCount(user: User) {
        const count = user.failedLoginCount;
        if (count >= 5) {
            user.isDisabled = true;
            await this.save(user);

            const userActivation = new UserActivation(user);
            await userActivation.notifyUser("Maximum Login Attempt Exceeded");
        }
        return count;
    }

    async validateLoginPassword(user: User, passwordDto: PasswordDto) {
        let result = await comparePassword(passwordDto.password, user.password);

        if (!result) {
            let count = ++user.failedLoginCount;
            logger.info(`Incrementing Failed count for user -> ${user.username} : count -> ${count}`)
            await this.updateWhere(user.id, {failedLoginCount: count});
        } else {
            if (user.failedLoginCount > 0) {
                logger.info(`Resetting Failed count for user -> ${user.username}`)
                await this.updateWhere({id: user.id}, {failedLoginCount: 0, lastLoginDate: new Date()});
            }
        }

        return result;
    }

    async validateLoginValue(value: string) {
        let findClause = {where: [{username: value}, {email: value}, {phone: value}]};
        return await this.findWhere(findClause);
    }

    async validateLoginData(loginDetails: LoginDto) {
        let login = plainToClass(LoginDto, loginDetails);
        return await validateObject(login);
    }

    async validateActivationData(passwordDto: PasswordDto) {
        const toCheck = plainToClass(PasswordDto, passwordDto);

        let error = await validateObject(toCheck);
        if (error) return error;

        const decrypted = decrypt(passwordDto.key);
        const username = decrypted.username;

        let savedUser = await this.findWhere({username: username});

        const activated = new UserActivation(savedUser);
        await activated.updateIsUsed(passwordDto.key);

        savedUser.password = await hashPassword(passwordDto.password);
        savedUser.isDisabled = false;
        savedUser.failedLoginCount = 0;

        await this.save(savedUser);

        return null;

    }

    async validateActivationKey(key: String) {
        try {
            const decrypted = decrypt(key);
            if (!decrypted) return createMessage("Invalid Link");

            const username = decrypted.username;
            const createdDate: Date = decrypted.createdDate;

            let user = await this.findWhere({username: username});
            if (!user) return notFound("User");

            const activated = new UserActivation(user);

            let invalidData = await activated.validateEncryption(key);
            if (invalidData) return invalidData;

            let invalidDate = activated.validateDate(createdDate);
            if (invalidDate) return invalidDate;

            return null;

        } catch (e) {
            return {"message": e.message};
        }
    }

    async onBoardUser(user: User) {
        const savedUser = await this.save(user);
        const activate = new UserActivation(savedUser);
        await activate.notifyUser("Activate Account");
        return classToClass(savedUser, UserDto);
    }

    async validateNewUser(signupDto: SignupDto) {
        const toCheck = plainToClass(SignupDto, signupDto);

        const errors = await validateObject(toCheck);
        if (errors) return errors;

        const usernameError = await this.usernameExist(signupDto.username);
        if (usernameError) return usernameError;

        const emailError = await this.emailExist(signupDto.email)
        if (emailError) return emailError;

        const phoneError = await this.phoneExist(signupDto.phone)
        if (phoneError) return phoneError;

        return null;
    }

    async findWhere(whereClause: object) {
        return await this.getRepo().findOne(whereClause);
    }

    async all() {
        return await this.getRepo().find();
    }

    async one(id) {
        return await this.getRepo().findOne(id);
    }

    async remove(id) {
        let userToRemove = await this.getRepo().findOne(id);
        await this.getRepo().softDelete(userToRemove);
    }

    private static generateToken(user: User) {
        logger.info(`Generating token for user -> ${user.username}`);
        return jwt.sign({id: user.id, role: user.role, status: user.status}, key, {expiresIn: '1h'});
    }

    private async emailExist(email: string) {
        if (email.length > 1) {
            const user = await this.getRepo().findOne({email: email});
            if (user) return createMessage(`A user with the email: ${email}, already exist`);
        }
        return null;
    }

    private async usernameExist(username: string) {
        const user = await this.getRepo().findOne({username: username});
        if (user) return createMessage(`Username: ${username} already taken, please try another`);
        return null;
    }

    private async phoneExist(phone: string) {
        if (phone.length > 1) {
            const user = await this.getRepo().findOne({phone: phone});
            if (user) return createMessage(`A user with this Phone Number: ${phone} already exist`);
        }
        return null;
    }

    private async updateWhere(searchFor: Object, update: Object) {
        //sample searchFor { firstName: "Timber" } and update { firstName: "Jerry" }
        return await this.getRepo().update(searchFor, update);
    }

    private async save(user: User) {
        return await this.getRepo().save(user);
    }

}