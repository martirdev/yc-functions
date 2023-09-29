import {z} from 'zod';

export const RequestParams = z.object({
  block_id: z.string(),
  name: z.string(),
  section_id: z.string(),
  content: z.string().optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
