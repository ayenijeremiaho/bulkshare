import {validate, ValidationError} from "class-validator";
import {logger} from "../../utility";

export function setError(result: ValidationError[]): Object {
    let propBag = {};
    for (const error of result) {
        logger.info("Error after validation ", error);
        for (const key in error.constraints) {
            if (Object.prototype.hasOwnProperty.call(error.constraints, key)) {
                (propBag as any)[error.property] = error.constraints[key];
            }
        }
    }
    return propBag;
}

export async function validateObject(classObject) {
    let errors;
    try {
        logger.info("Validating Object");

        let result = await validate(classObject);
        if (result.length > 0) errors = setError(result);

    } catch (e) {
        logger.error("Error Validating Object " + e);
    }
    return errors;
}