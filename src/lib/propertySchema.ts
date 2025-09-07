import { z } from "zod";

export const PropertyBase = z.object({
  slug: z.string().min(1),
  url: z.string().min(1),
  // numerics
  price_thb: z.number().nonnegative().default(0),
  bedrooms: z.number().int().nonnegative().default(0),
  bathrooms: z.number().int().nonnegative().default(0),
  living_sqm: z.number().nullable().default(null),
  land_sqm: z.number().nullable().default(null),
  floor: z.number().int().nullable().default(null),
  year_built: z.number().int().nullable().default(null),
  lat: z.number().nullable().default(null),
  lng: z.number().nullable().default(null),
  // enums
  type: z.enum(["villa","house","condo","apartment","townhouse","land","office","other"]).default("condo"),
  for: z.enum(["sale","rent"]).default("sale"),
  status: z.enum(["available","reserved","sold","rented"]).default("available"),
  furnishing: z.enum(["unfurnished","partly","furnished"]).default("furnished"),
  ownership: z.string().default("Thai Quota"),
  project: z.string().optional(),
  district: z.string().optional(),
  location: z.string().default("Pattaya"),
  // media
  cover: z.string().optional(),
  images: z.array(z.string()).default([]),
  video_url: z.string().optional(),
  // meta
  features: z.array(z.string()).default([]),
  amenities: z.array(z.string()).default([]),
  parking: z.string().optional(),
  fees_hoa_thb: z.number().nonnegative().optional(),
  // localized
  title: z.string().min(1),
  description: z.string().optional(),
  body: z.string().optional()
});

export type Property = z.infer<typeof PropertyBase>;
