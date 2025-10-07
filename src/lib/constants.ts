export const isDev = process.env.NODE_ENV === "development";

// Notion Database
export const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Payment Information
export const PAYMENT_INFO = {
  iban: process.env.PAYMENT_IBAN,
  accountHolder: "appricot GmbH",
  address: "Industriestrasse 70, 6300 Zug, Switzerland",
  revolut: {
    name: "Lukas Hotz",
    phone: process.env.PAYMENT_PHONE,
  },
  twint: {
    link: "https://go.twint.ch/1/e/tw?tw=acq.N_syTGB2S22l8iFj2bOfdrVCi15qZNvseICaSQyvpc0ZmjpIn1MPE6CKOzOenu7T.",
  },
  contactEmail: process.env.CONTACT_EMAIL,
} as const;

