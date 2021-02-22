import {getRepository} from "typeorm";
import {Category} from "../../entity/Category";


export class ShopCategoryService {

    private getRepo = () => getRepository(Category);

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

    private async save(category: Category) {
        return await this.getRepo().save(category);
    }
}