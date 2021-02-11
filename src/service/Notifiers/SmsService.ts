import config from "config";
import {logger} from "../../utility";
import axios from "axios";

const API_TOKEN = String(config.get("sms.APi_KEY"));
const hostname = String(config.get("sms.hostname"));
const sender = String(config.get("sms.sender"));

export async function sendSms(to: string, body: string) {
    return pushMail(to, body);
}

const pushMail = (to, body) => {
    axios.post(hostname, {
        api_token: API_TOKEN,
        from: sender,
        to: to,
        body: body
    })
        .then(function (response) {
            logger.info(response.statusText, response);
            return response.data['status'];
        })
        .catch(function (error) {
            logger.error(error.message, error);
            return false;
        });
}

