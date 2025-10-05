import { z } from "zod";

// Bird categories
export const BIRD_CATEGORIES = [
  "Birds of Paradise",
  "Origami Birds",
  "Walking Birds",
  "Ocean Birds",
  "Dinosaur Birds",
  "Cartoon Birds",
  "Chicks",
  "Mecha Birds",
  "Night Birds",
  "Dark Birds",
  "Mythological Birds",
  "Birds of Prey",
] as const;

export type BirdType = typeof BIRD_CATEGORIES[number];

// Step 2 (Identity) validation schema
export const identitySchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(1, "Phone or Telegram handle is required"),
  referredBy: z.string().min(1, "Please tell us who invited you"),
  previousVoyages: z.string().min(1, "Please select a number"),
  allergies: z.string().optional(),
  conditions: z.string().optional(),
  genderIdentity: z.string().min(1, "Please select your gender identity"),
});

export type IdentityFormData = z.infer<typeof identitySchema>;

// Step 3 (Logistics) validation schema
export const logisticsSchema = z.object({
  nights: z.array(z.string()).min(1, "Please select at least one night"),
  transportation: z.string().min(1, "Please select your transportation method"),
  canTransportMaterial: z.boolean().optional(),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  sleepingArrangement: z.string().min(1, "Please select your sleeping arrangement"),
  takeMealLead: z.boolean().optional(),
  mealPreference: z.string().optional(),
  kitchenExperience: z.string().optional(),
  hasMedicalEducation: z.boolean().optional(),
  medicalBackground: z.string().optional(),
});

export type LogisticsFormData = z.infer<typeof logisticsSchema>;

// Step 4 (Workshops & Music) validation schema
export const workshopsMusicSchema = z.object({
  organizeWorkshop: z.boolean().optional(),
  workshopTitle: z.string().optional(),
  workshopDayTime: z.string().optional(),
  workshopDescription: z.string().optional(),
  workshopSpace: z.string().optional(),
  shareSpace: z.string().optional(),
  playDjSet: z.boolean().optional(),
  djDayTime: z.string().optional(),
  soundcloudLink: z.string().optional(),
  musicStyle: z.string().optional(),
  playUnplugged: z.boolean().optional(),
  unpluggedDescription: z.string().optional(),
});

export type WorkshopsMusicFormData = z.infer<typeof workshopsMusicSchema>;

// Step 5 (Oracle) validation schema
export const oracleSchema = z.object({
  question1: z.string().min(1, "Please answer this question"),
  question1Other: z.string().optional(),
  question2: z.string().min(1, "Please answer this question"),
  question2Other: z.string().optional(),
  question3: z.string().min(1, "Please answer this question"),
  question3Other: z.string().optional(),
  question4: z.string().min(1, "Please answer this question"),
  question4Other: z.string().optional(),
  birdCategory: z.string().optional(),
});

export type OracleFormData = z.infer<typeof oracleSchema>;

// Step 6 (Contribution) validation schema
export const contributionSchema = z.object({
  contributionAmount: z.string().min(1, "Please select a contribution amount"),
});

export type ContributionFormData = z.infer<typeof contributionSchema>;

// All registration data
export type RegistrationData = {
  identity?: IdentityFormData;
  logistics?: LogisticsFormData;
  workshopsMusic?: WorkshopsMusicFormData;
  contribution?: ContributionFormData;
  birdCategory?: BirdType;
};

