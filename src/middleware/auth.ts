import {Request, Response} from "express";
import {UserService} from "../service/User/UserService";
import {createMessage, noAccess} from "../service/Utility/messages";
import {User} from "../entity/User";
import {role} from "../service/Utility/enums";
import {logger} from "../utility";

function errorResponse(res: Response) {
    res.status(403).send(noAccess());
}

function isASeller(userRole: role) {
    return userRole != role.BUYER;
}

export const verifyToken = (req: Request, res: Response, next) => {
    let authHeader = req.header('authorization');

    if (authHeader !== undefined) {
        let token = authHeader.split(' ')[1];

        let userService = new UserService();
        let result = userService.verifyUserToken(token);

        if (!result) return errorResponse(res);

        req["token"] = token;
        req["result"] = result;
        req["userService"] = userService;

        next();
    } else {
        return errorResponse(res);
    }
}

export const verifyShopExist = (req: Request, res: Response, next) => {
    let result: User = req["result"];
    let userService: UserService = req["userService"];

    userService.one(result.id)
        .then(r => {
            if (isASeller(r.role)) {
                next();
            } else {
                return res.status(403).send(createMessage("No Shop linked to user, please create shop first"));
            }
        })
}
