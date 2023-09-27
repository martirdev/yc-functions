import {z} from 'zod';

export const RequestParams = z.object({
  block_id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
