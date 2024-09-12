const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

async function send(targetEmail, resetToken) {
    try {
        const info = await transporter.sendMail({
            from: 'Blog Platform',
            to: targetEmail,
            subject: "Reset your password",
            html: await ejs.renderFile(
                path.join(__dirname, '../views/pages/auth', 'reset-password-mail.ejs')
                ,
                {resetLink: 'http://localhost:3000/reset-password/verify?token=' + resetToken}
            ),
        });
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = send;