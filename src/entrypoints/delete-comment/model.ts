import {z} from 'zod';

export const RequestParams = z.object({
    comment_id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
