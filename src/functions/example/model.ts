import {z} from 'zod';

export const RequestParams = z.object({
  id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
