import {NextFunction, Request, Response} from "express";
import {UserService} from "../service/User/UserService";
import {validate} from "class-validator";

export class UserController {

    private static getService (){
        return new UserService();
    }

    all(request: Request, response: Response, next: NextFunction) {
        return response.json(UserController.getService().all());
    }

    one(request: Request, response: Response, next: NextFunction) {
        let id = request.params.id;

        let result = UserController.getService().one(id);
        if(result) return response.send(200).json(result);

        return response.status(404).send("No User");
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let result = await UserController.getService().validate(request.body);
        if(!result){
            return response.json(UserController.getService().save(request.body));
        }
        return response.status(404).send("Error Saving user");
    }

    remove(request: Request, response: Response, next: NextFunction) {
        return UserController.getService().remove(request.params.id);
    }

}