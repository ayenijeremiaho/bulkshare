import {createTransport, Transporter} from "nodemailer";
import {logger} from "../../utility";
import {get} from "config";

const host = String(get("mail.host"));
const port = Number(get("mail.password"));
const user = String(get("mail.user"));
const password = String(get("mail.password"));
const secure = Boolean(get("mail.secure"));

let transporter = createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
        user: user,
        pass: password,
    },
});


export async function sendMail(to: string, subject: string, text: string) {
    try {
        await spoolAMail(transporter, to, subject, text);
        logger.info(`Email Successfully sent to ${to}`);
        return true;
    } catch (ex) {
        logger.error(`Email Sending failed because ${ex.message}`, ex);
        return false;
    }
}

// send mail with defined transport object
let spoolAMail = async (transporter: Transporter, to: string, subject: string, text?, html?) => await transporter.sendMail({
    from: '"Testing 👻" <noreply@bulkshare.com>', // sender address
    to: to, // list of receivers
    subject: `${subject} ✔`, // Subject line
    text: text, // plain text body
    // html: "<b>Hello world?</b>", // html body
});

