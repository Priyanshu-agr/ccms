import { z } from 'zod';

const createClubSchema = z.object({
  club_name: z.string().min(1),
  club_description: z.string().optional(),
  is_technical: z.boolean(),
  club_mentor: z.number().int(),
  club_president: z.string().length(9).optional(),
  club_vice_president: z.string().length(9).optional(),
  club_secretary: z.string().length(9).optional(),
  club_treasurer: z.string().length(9).optional(),
  event_count: z.number().int().optional(),
});

const updateClubSchema = z.object({
  club_name: z.string().min(1).optional(),
  club_description: z.string().optional(),
  is_technical: z.boolean().optional(),
  club_mentor: z.number().int().optional(),
  club_president: z.string().length(9).optional(),
  club_vice_president: z.string().length(9).optional(),
  club_secretary: z.string().length(9).optional(),
  club_treasurer: z.string().length(9).optional(),
  event_count: z.number().int().optional(),
});

export { createClubSchema, updateClubSchema };