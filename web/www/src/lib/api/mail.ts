import { ApiImpl } from "./apiImpl";

export class MailApi extends ApiImpl {
  protected path: string = "/mail/";

  sendMail(body: { to: string; title: string; message: string }) {
    return this.xior.post<void>(
      "http://172.104.159.86:10007/mail/sendmail",
      body
    );
  }
}
