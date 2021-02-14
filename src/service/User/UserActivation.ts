import {getRepository} from "typeorm";
import {User} from "../../entity/User";
import {Activation} from "../../entity/Activation";
import {sendMail} from "../Notifiers/MailService";
import {encrypt} from "../Utility/encryptDecrypt";

export class UserActivation {

    private readonly username;
    private readonly email;
    private readonly dateCreated;
    private readonly userData : User;

    constructor(user: User) {
        this.username = user.username;
        this.email = user.email;
        this.dateCreated = user.deletedDate;
        this.userData = user;
    }

    private getRepo = () => getRepository(Activation);

    encryptData() {
        return encrypt({username: this.username, createdDate: this.dateCreated});
    }

    async notifyNewUser() {
        const encryptedData = this.encryptData();
        let activation = new Activation();
        activation.encrypted = encryptedData;
        await this.save(activation);
        await sendMail(this.email, "Activate Account", encryptedData);
    }

    async save(activation: Activation) {
        return await this.getRepo().save(activation);
    }

    async validateEncryption(encryptedData) {
        const activation = await this.getRepo().findOne({encrypted: encryptedData});
        return !activation.isUsed;
    }

    async updateIsUsed(encryptedData) {
        await this.getRepo().update({encrypted: encryptedData}, {isUsed: true});

    }
}
