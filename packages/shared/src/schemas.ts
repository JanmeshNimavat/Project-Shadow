import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string(),
  badge_number: z.string().optional(),
  department: z.string().optional(),
  role: z.enum(['admin', 'investigator', 'analyst']),
  is_active: z.boolean(),
  created_at: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;
