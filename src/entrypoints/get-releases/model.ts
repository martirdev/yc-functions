import {z} from 'zod';

export const RequestParams = z.object({
  repo: z.string(),
  page: z.number().optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
