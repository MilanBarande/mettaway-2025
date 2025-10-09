import { z } from "zod";

// Bird categories
export const BIRD_CATEGORIES = [
  "Birds of Paradise",
  "Origami Birds",
  "Ground Birds",
  "Sea Birds",
  "Ancient Birds",
  "Fancy Birds",
  "Chicks",
  "Mechanical Birds",
  "Night Birds",
  "Dark Birds",
  "Mythical Birds",
  "Birds of Prey",
] as const;

export type BirdType = typeof BIRD_CATEGORIES[number];

// Map bird categories to video filenames
export const BIRD_VIDEO_MAP: Record<BirdType, string> = {
  "Birds of Paradise": "Birds of Paradise.mp4",
  "Origami Birds": "Folded Birds.mp4",
  "Ground Birds": "Walking Birds.mp4",
  "Sea Birds": "Birds of the seas.mp4",
  "Ancient Birds": "Ancient Birds.mp4",
  "Fancy Birds": "Fancy Birds.mp4",
  "Chicks": "Chicks.mp4",
  "Mechanical Birds": "Mecha Birds.mp4",
  "Night Birds": "Night Birds.mp4",
  "Dark Birds": "Dark Birds.mp4",
  "Mythical Birds": "Mythical Birds.mp4",
  "Birds of Prey": "Birds of Prey.mp4",
};

// Map bird categories to collective phrases
export const BIRD_COLLECTIVE_MAP: Record<BirdType, string> = {
  "Birds of Paradise": "a kaleidoscope of birds of paradise",
  "Origami Birds": "a fold of origami birds",
  "Ground Birds": "a stroll of ground birds",
  "Sea Birds": "a plunge of sea birds",
  "Ancient Birds": "a relic of ancient birds",
  "Fancy Birds": "a fantasy of fancy birds",
  "Chicks": "a curiosity of chicks",
  "Mechanical Birds": "a craft of mechanical birds",
  "Night Birds": "a noctuid of night birds",
  "Dark Birds": "a blackout of dark birds",
  "Mythical Birds": "a divine of mystical birds",
  "Birds of Prey": "a cast of birds of prey",
};

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
  question1: z.string()
    .min(10, "Please provide at least 10 characters")
    .max(200, "Please keep your answer under 200 characters"),
  question2: z.string()
    .min(10, "Please provide at least 10 characters")
    .max(200, "Please keep your answer under 200 characters"),
  question3: z.string()
    .min(10, "Please provide at least 10 characters")
    .max(200, "Please keep your answer under 200 characters"),
  question4: z.string()
    .min(10, "Please provide at least 10 characters")
    .max(200, "Please keep your answer under 200 characters"),
  question5: z.string()
    .min(10, "Please provide at least 10 characters")
    .max(200, "Please keep your answer under 200 characters"),
  question6: z.string()
    .min(10, "Please provide at least 10 characters")
    .max(200, "Please keep your answer under 200 characters"),
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
  oracle?: OracleFormData;
  contribution?: ContributionFormData;
  birdCategory?: BirdType;
};

