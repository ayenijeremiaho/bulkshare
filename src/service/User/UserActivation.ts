import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import {Activation} from "../../entity/Activation";
import {sendMail} from "../Notifiers/MailService";
import {encrypt} from "../Utility/encryptDecrypt";
import {createMessage} from "../Utility/messages";
import {logger} from "../../utility";
import {sendSms} from "../Notifiers/SmsService";

export class UserActivation {

    private readonly username;
    private readonly email;
    private readonly phone;
    private readonly createdDate;
    private readonly userData: User;

    constructor(user: User) {
        this.username = user.username;
        this.email = user.email;
        this.phone = user.phone;
        this.createdDate = user.createdDate;
        this.userData = user;
    }

    private getRepo = () => getRepository(Activation);

    encryptData() {
        return encrypt({username: this.username, createdDate: this.createdDate});
    }

    async notifyUser(subject: string) {
        const encryptedData = this.encryptData();
        let activation = new Activation();
        activation.encrypted = encryptedData;
        await this.save(activation);
        sendMail(this.email, subject, encryptedData).then();
        // sendSms(this.phone, encryptedData).then();
    }

    async save(activation: Activation) {
        return await this.getRepo().save(activation);
    }

    async validateEncryption(encryptedData) {
        logger.info("Validating Encryption Hasn't been used");
        const activation = await this.getRepo().findOne({encrypted: encryptedData});
        if (activation.isUsed) return createMessage("Link has already been used");
        return;
    }

    validateDate(dateCreated: Date) {
        logger.info("Validating Encryption Hasn't expired");
        const today: Date = new Date();
        let diff = (today.valueOf() - dateCreated.valueOf()) / 3600000;
        if (diff > 24) return createMessage("Expired Link");
        return;
    }

    async updateIsUsed(encryptedData) {
        return await this.getRepo().update({encrypted: encryptedData}, {isUsed: true});
    }
}
