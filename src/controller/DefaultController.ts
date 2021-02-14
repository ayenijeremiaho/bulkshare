import {NextFunction, Request, Response} from "express";

export class DefaultController {

    home(request: Request, response: Response, next: NextFunction) {
        return response.send("Welcome to BulkShare API");
    }
}