import {z} from 'zod';

export const RequestParams = z.object({
    order_id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
