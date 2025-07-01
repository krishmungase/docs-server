import nodemailer from "nodemailer";
import Config from "../config/index.js";

class NotificationService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: Config.MAIL_HOST,
      port: Config.MAIL_PORT,
      secure: false,
      auth: {
        user: Config.MAIL_USERNAME,
        pass: Config.MAIL_PASSWORD,
      },
    });
  }

  async send(message) {
    await this.transporter.sendMail({
      from: message?.from
        ? `${message.from} <${Config.MAIL_USERNAME}>`
        : Config.MAIL_FROM,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html,
    });
  }
}

export default NotificationService;
