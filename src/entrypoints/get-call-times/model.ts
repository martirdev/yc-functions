import {z} from 'zod';

export const RequestParams = z.object({
  filter: z.string().optional(),
  type: z.string().optional(),
  limit: z.number(),
  offset: z.number(),
  is_radio_practice: z.boolean().optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
