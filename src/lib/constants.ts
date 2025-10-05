export const isDev = process.env.NODE_ENV === "development";

// Payment Information
export const PAYMENT_INFO = {
  iban: "CH77 0078 7007 7169 1140 9",
  accountHolder: "appricot GmbH",
  address: "Industriestrasse 70, 6300 Zug, Switzerland",
  revolut: {
    name: "Lukas Hotz",
    phone: "+41 79 288 68 53",
  },
  twint: {
    link: "https://go.twint.ch/1/e/tw?tw=acq.N_syTGB2S22l8iFj2bOfdrVCi15qZNvseICaSQyvpc0ZmjpIn1MPE6CKOzOenu7T.",
  },
  contactEmail: "hotzluc@pm.me",
} as const;

