type EnvMap = Record<string, string | undefined>;

const env = import.meta.env as EnvMap;

const readEnv = (key: string, fallback = "") => {
  const value = env[key];
  if (!value) return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

export const CONTACT_DETAILS = {
  address: readEnv("VITE_CONTACT_ADDRESS", "Bhubaneswar, Khordha"),
  email: readEnv("VITE_CONTACT_EMAIL", "sujitsmaharana05@gmail.com"),
  phone: readEnv("VITE_CONTACT_PHONE", "+91 8328837701"),
  whatsapp: readEnv("VITE_CONTACT_WHATSAPP", readEnv("VITE_CONTACT_PHONE", "+91 8328837701")),
  mapEmbedUrl: readEnv(
    "VITE_CONTACT_MAP_EMBED_URL",
    "https://www.google.com/maps?q=Bhubaneswar,%20Khordha&output=embed",
  ),
};

export const COMPANY_EMAIL = readEnv("VITE_COMPANY_EMAIL", CONTACT_DETAILS.email);
export const GOOGLE_SHEET_URL = readEnv("VITE_GOOGLE_SHEET_URL");

export const formatTelLink = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;
export const formatWhatsAppLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g, "")}`;

export type ContactRequest = {
  source: "contact_page" | "home_consultation";
  name: string;
  email: string;
  phone?: string;
  country?: string;
  treatment?: string;
  message?: string;
  fileName?: string;
  createdAt: string;
};

export type TravelAssistanceRequest = {
  source: "travel_assistance";
  name: string;
  country: string;
  travelDates?: string;
  city?: string;
  budget?: string;
  createdAt: string;
};

type LeadPayload = Record<string, string | undefined>;

export const submitLead = async (payload: LeadPayload) => {
  if (!GOOGLE_SHEET_URL) {
    throw new Error("Missing VITE_GOOGLE_SHEET_URL");
  }

  const body = new URLSearchParams();
  Object.entries({
    ...payload,
    notifyEmail: payload.notifyEmail || COMPANY_EMAIL,
  }).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const stringValue = String(value).trim();
    if (!stringValue) return;
    body.append(key, stringValue);
  });

  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
  } catch (error) {
    await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      body,
    });
  }
};

export const submitContactRequest = async (payload: ContactRequest) => {
  return submitLead(payload);
};

export const submitTravelAssistanceRequest = async (payload: TravelAssistanceRequest) => {
  return submitLead(payload);
};
