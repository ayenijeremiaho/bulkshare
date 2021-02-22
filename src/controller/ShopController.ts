import {Request, Response} from "express";
import {ShopService} from "../service/Shop/ShopService";

export class ShopController {

    //shortened for get_shop_service
    private static g_s_s() {
        return new ShopService();
    }

    home(request: Request, response: Response) {
        return response.send("Welcome to BulkShare API");
    }

    async add(request: Request, response: Response) {
        let result = await ShopController.g_s_s().validateShopDetails(request.body);

        if (!result) {
            const userId = request["result"].id;
            return response.send(await ShopController.g_s_s().createShop(request.body, userId));
        }

        return response.status(404).json(result);
    }
}