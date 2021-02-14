import {AES, enc} from "crypto-js";
import config from "config";

let key = String(config.get("key"));

// Encrypt
export function encrypt(data) {
    return AES.encrypt(JSON.stringify(data), key).toString();
}

// Decrypt
export function decrypt(encrypted) {
    let bytes = AES.decrypt(encrypted, key);
    // @ts-ignore
    return JSON.parse(bytes.toString(enc.Utf8))
}