import {get} from "config";
import {AES, enc} from "crypto-js";
import {logger} from "../../utility";
import {compare, hash} from "bcrypt";

const key = String(get('key.value'));

// Encrypt
export function encrypt(data) {
    logger.info("Encrypting Data");
    return AES.encrypt(JSON.stringify(data), key).toString();
}

// Decrypt
export function decrypt(encrypted) {
    logger.info(`Decrypting data ${encrypted}`);
    try {
        let bytes = AES.decrypt(encrypted, key);
        // @ts-ignore
        return JSON.parse(bytes.toString(enc.Utf8))
    } catch (e) {
        logger.info(`Error decrypting ${e.message}`);
        return null;
    }
}

export async function hashPassword(password: string) {
    return await hash(password, 10);
}

export async function comparePassword(password: string, hashed: string) {
    try {
        logger.info("Comparing password with hash")
        return await compare(password, hashed)
    }catch (e) {
        logger.error(`Comparison Failed ${e.message}`);
        return false;
    }
}