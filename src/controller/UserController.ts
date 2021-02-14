import {NextFunction, Request, Response} from "express";
import {UserService} from "../service/User/UserService";
import {User} from "../entity/User";
import {plainToClass} from "class-transformer";

export class UserController {

    //shortened for get_user_service
    private static g_u_s() {
        return new UserService();
    }

    async verifyUser(request: Request, response: Response, next: NextFunction) {
        if (!request.body.key) return response.status(404).json("Invalid Request");

        let result = await UserController.g_u_s().validateActivation(request.body);

        if (!result) {
            return response.send({"message": "Successfully activated"});
        }

        response.send()
    }

    all(request: Request, response: Response, next: NextFunction) {
        return response.send(UserController.g_u_s().all());
    }

    async one(request: Request, response: Response, next: NextFunction) {
        let id = request.params.id;
        let result = await UserController.g_u_s().one(id);

        if (result) return response.send(200).json(result);

        return response.status(404).send("No User");
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let result = await UserController.g_u_s().validateNewUser(request.body);

        if (!result) {
            const user = plainToClass(User, request.body);
            return response.send(UserController.g_u_s().onBoardUser(user));
        }

        return response.status(404).json(result);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        return UserController.g_u_s().remove(request.params.id);
    }

}