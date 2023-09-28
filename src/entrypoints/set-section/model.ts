import {z} from 'zod';

export const RequestParams = z.object({
  section_id: z.string(),
  parent_id: z.string().optional(),
  name: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
