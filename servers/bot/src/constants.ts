import { Resend } from "resend";

export const Interactions = {
  TICKET_CATEGORY: "ticket_category",
};

export const Commands = {
  CREATE_TICKET: "create-ticket",
};


export const resend = new Resend(process.env.RESEND_API_KEY);