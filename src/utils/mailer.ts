import nodemailer, { Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import "dotenv/config";

async function mailer(recipientMail: string, url: string) {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT!),
        secure: false,
        auth: {
            user: process.env.SMTP_USERMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    });
    
    try {
        const info = await transporter.sendMail({
            from: '"CCMS Admin" <ccms.soe@gmail.com>',
            to: recipientMail,
            subject: "CCMS Email Verification",
            text: "Please verify your email address",
            html: "<b>Please verify your email address</b> <br> <a href='" + url + "'>Click here to verify</a>"
        })
    } catch (error) {
        return false;
    }

    return true;
}

export default mailer;