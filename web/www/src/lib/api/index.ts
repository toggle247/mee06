import xior, { type XiorInstance } from "xior";
import { MailApi } from "./mail";

export default class Api {
  readonly mail: MailApi;
  readonly xior: XiorInstance;

  constructor(baseURL: string) {
    this.xior = xior.create({ baseURL });
    this.mail = new MailApi(this.xior);
  }

  static #instance: Api;

  static get instance() {
    if (this.#instance) return this.#instance;
    console.log(import.meta.env);
    this.#instance = new Api(import.meta.env.VITE_APP_API_BASE_URL);
    return this.#instance;
  }
}
