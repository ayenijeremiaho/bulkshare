import {ClassConstructor, classToPlain, plainToClass} from "class-transformer";

export function classToClass(object:any, className: ClassConstructor<any>) {
    let userObject = classToPlain(object);
    return plainToClass(className, userObject);
}