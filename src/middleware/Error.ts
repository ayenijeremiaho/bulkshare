import {Request, Response} from "express";
import {logger} from "../utility";

export const errorHandler = (err: Error, req: Request, res: Response, next) => {
    logger.error(err.message, err);
    return res.status(500).send(err.message);
}