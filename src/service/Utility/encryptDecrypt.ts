import {get} from "config";
import {AES, enc} from "crypto-js";

const key = String(get('key.value'));

// Encrypt
export function encrypt(data) {
    process.env.NODE_ENV = "stage";
    console.log(process.env.NODE_ENV);

    return AES.encrypt(JSON.stringify(data), key).toString();
}

// Decrypt
export function decrypt(encrypted) {
    let bytes = AES.decrypt(encrypted, key);
    // @ts-ignore
    return JSON.parse(bytes.toString(enc.Utf8))
}