import xior, { XiorInstance } from "xior";
import { format } from "./format";

export class Telegram {
  readonly xior: XiorInstance;

  constructor(accessToken: string) {
    this.xior = xior.create({
      baseURL: format("https://api.telegram.org/bot%/", accessToken),
    });
  }

  sendMessage(chat_id: number, text: string, parse_mode = "MarkdownV2") {
    return this.xior.post("sendMessage", {
      chat_id,
      text,
      parse_mode,
    });
  }
}
