import {z} from 'zod';

export const RequestParams = z.object({
    filter: z.string().optional(),
    category: z.string().optional(),
    limit: z.number().positive(),
    offset: z.number().positive()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
