import { createTransport } from 'nodemailer';
export const sendEmail = async (to, subject, html) => {
    try {
        // Create a transporter object using SMTP
        const transporter = createTransport({
            host: 'smtp-relay.sendinblue.com',
            port: 587,
            auth: {
                user: 'muhammadsiraj9122@gmail.com',
                pass: process.env.SENDINBLUE_APIKEY
            }
        });
        // Define the email options
        const mailOptions = {
            from: 'muhammadsiraj9122@gmail.com',
            to,
            subject,
            html
        };
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
};
//# sourceMappingURL=send_email.utils.js.map