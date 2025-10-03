import { z } from "zod";

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

// All registration data
export type RegistrationData = {
  identity?: IdentityFormData;
  logistics?: LogisticsFormData;
  // Add other steps as they're defined
};

