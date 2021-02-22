import {Request, Response} from "express";
import {UserService} from "../service/User/UserService";
import {User} from "../entity/User";
import {plainToClass} from "class-transformer";
import {createMessage, notFound} from "../service/Utility/messages";

export class UserController {

    //shortened for get_user_service
    private static g_u_s() {
        return new UserService();
    }

    async login(request: Request, response: Response) {
        const errors = await UserController.g_u_s().validateLoginData(request.body);
        if (errors) return response.status(400).send(errors);

        const user: User = await UserController.g_u_s().validateLoginValue(request.body.value);
        if (!user) return response.status(400).send(createMessage("User does not exist"));
        if (user.isDisabled) return response.status(403).send(createMessage("Disabled user, check email for instructions"));

        const count = await UserController.g_u_s().verifyFailedLoginCount(user);
        if (count >= 5) return response.status(403).send(createMessage("Exceeded maximum tries. check email"));

        const valid = await UserController.g_u_s().validateLoginPassword(user, request.body);
        if (!valid) return response.status(400).send(createMessage("Incorrect Password"));

        return response.send(UserController.g_u_s().generateUserToken(user));
    }

    async activate(request: Request, response: Response) {
        if (!request.body.key) return response.status(404).send("Invalid Request");

        let keyError = await UserController.g_u_s().validateActivationKey(request.body.key);
        if (keyError) return response.status(403).send(keyError);

        let dataError = await UserController.g_u_s().validateActivationData(request.body);
        if (dataError) return response.status(400).send(dataError);

        return response.send(createMessage("Successfully Activated"));


    }

    async signup(request: Request, response: Response) {
        let result = await UserController.g_u_s().validateNewUser(request.body);

        if (!result) {
            const user = plainToClass(User, request.body);
            return response.send(await UserController.g_u_s().onBoardUser(user));
        }

        return response.status(404).json(result);
    }

    all(request: Request, response: Response) {
        return response.send(UserController.g_u_s().all());
    }

    async remove(request: Request) {
        return UserController.g_u_s().remove(request.params.id);
    }

    async one(request: Request, response: Response) {
        let id = request.params.id;
        let user: User = await UserController.g_u_s().one(id);

        if (user) return response.send(user);

        return response.status(404).send(notFound("User"));
    }

}