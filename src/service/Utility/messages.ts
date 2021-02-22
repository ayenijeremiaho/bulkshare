import {logger} from "../../utility";

export function createMessage(description: String){
    logger.info(description);
    return ({
        message: description
    });
}

export function noAccess (){
    let message = `You dont have access to view this resource`;
    const error = createMessage(message);
    logger.error(error);
    return error;
}

export function notFound (value: String){
    let message = `${value} not found`;
    const error = createMessage(message);
    logger.error(error);
    return error;
}