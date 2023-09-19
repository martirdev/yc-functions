import {z} from 'zod';

export const RequestParams = z.object({
    product_id: z.string(),
    category_id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    material: z.string().optional(),
    packaging: z.string().optional(),
    delivery: z.string().optional(),
    //TODO: Поменять на enum как станут известны поля 
    choosing_size_guide: z.string().optional(),
    price: z.number().positive(),
    size: z.enum(["S","M","L"]),
    count: z.number().positive()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
