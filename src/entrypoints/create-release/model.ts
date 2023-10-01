import {z} from 'zod';

export const RequestParams = z.object({
  repo: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
