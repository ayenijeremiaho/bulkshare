import {Request, Response} from "express";
import winston from "winston";

export const errorHandler = (err: Error, req: Request, res: Response, next) => {
    winston.error(err.message, err);
    return res.status(500).send(err.message);
}