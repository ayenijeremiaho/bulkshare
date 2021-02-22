import {getRepository} from "typeorm";
import {Shop} from "../../entity/Shop";
import {plainToClass} from "class-transformer";
import {validateObject} from "../Utility/errorValidation";
import {AddShopDto} from "../../dto/AddShopDto";
import {createMessage} from "../Utility/messages";
import {ShopCategoryService} from "./ShopCategoryService";
import {UserService} from "../User/UserService";
import {classToClass} from "../Utility/convert";
import {sendMail} from "../Notifiers/MailService";
import {User} from "../../entity/User";
import {sendSms} from "../Notifiers/SmsService";
import {ShopDto} from "../../dto/ShopDto";

export class ShopService {

    private getRepo = () => getRepository(Shop);

    async createShop(shopDetails: AddShopDto, userId: String) {
        const shopCategoryService = new ShopCategoryService();
        const category = await shopCategoryService.one(shopDetails.id);

        const userService = new UserService();
        const user = await userService.one(userId);

        let shop: Shop = classToClass(shopDetails, Shop);
        shop.category = category;
        shop.user = user;

        await this.save(shop);
        await userService.upgradeToSeller(user);

        ShopService.notifyShopOwner(user, shop);

        return classToClass(shop, ShopDto);
    }

    async validateShopDetails(details: AddShopDto) {
        const toCheck = plainToClass(AddShopDto, details);

        const errors = await validateObject(toCheck);
        if (errors) return errors;

        const nameError = await this.shopNameExist(details.name);
        if (nameError) return nameError;

        const companyNoError = await this.companyNoExist(details.companyNo)
        if (companyNoError) return companyNoError;

        return null;
    }

    async all() {
        return await this.getRepo().find();
    }

    async one(id) {
        return await this.getRepo().findOne(id);
    }

    async remove(id) {
        let shopToRemove = await this.getRepo().findOne(id);
        await this.getRepo().softDelete(shopToRemove);
    }

    private static notifyShopOwner(user: User, shop: Shop) {
        let text = `Congratulations, Shop ${shop.name} was created successfully`;
        sendMail(user.email, "Shop Created Successfully", text).then();
        // sendSms(user.phone, text).then();
    }

    private async companyNoExist(companyNo: string) {
        if (companyNo.length > 1) {
            const shop = await this.getRepo().findOne({companyNo: companyNo});
            if (shop) return createMessage(`A Shop with the companyNo: ${companyNo}, already exist`);
        }
        return null;
    }

    private async shopNameExist(shopName: string) {
        const shop = await this.getRepo().findOne({name: shopName});
        if (shop) return createMessage(`Shop Name: ${shopName} already taken, please try another`);
        return null;
    }

    private async findWhere(whereClause: object) {
        return await this.getRepo().findOne(whereClause);
    }

    private async updateWhere(searchFor: Object, update: Object) {
        //sample searchFor { firstName: "Timber" } and update { firstName: "Jerry" }
        return await this.getRepo().update(searchFor, update);
    }

    private async save(shop: Shop) {
        return await this.getRepo().save(shop);
    }

}