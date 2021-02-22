import {get} from "config";
import {logger} from "../../utility";
import axios from "axios";

const API_TOKEN = String(get("sms.apikey"));
const hostname = String(get("sms.hostname"));
const sender = String(get("sms.sender"));

export async function sendSms(to: string, body: string) {
    if (to.length > 1) return pushMail(to, body);
}

const pushMail = function (to, body)  {
    axios.post(hostname, {
        api_token: `${API_TOKEN}`,
        from: `${sender}`,
        to: `${to}`,
        body: `${body}`
    })
        .then(function (response) {
            logger.info(`Sms Successfully sent to ${to}`);
            return response.data['status'];
        })
        .catch(function (error) {
            logger.error(`SMS Sending failed because ${error.message}`, error);
            return false;
        });
}

