import xior, {type XiorInstance } from "xior";
import { MailApi } from "./mail";

export default class Api {
  readonly mail: MailApi;
  readonly xior: XiorInstance;

  constructor(baseURL?: string){
    this.xior = xior.create({ baseURL });
    this.mail = new MailApi(this.xior);
  }

  static #instance: Api;

  static get instance(){
    if (this.#instance) return this.#instance;
    this.#instance = new Api();
    return this.#instance;
  }
}
