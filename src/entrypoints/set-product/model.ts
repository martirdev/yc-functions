import {z} from 'zod';

export const RequestParams = z.object({
    product_id: z.string(),
    category_id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    material: z.string().optional(),
    packaging: z.string().optional(),
    delivery: z.string().optional(),
    choosing_size_guide: z.string().optional(),
    price: z.number().positive(),
    storage: z.array(z.object({
        size: z.enum(["NoSize", "XS", "S", "M", "L", "XL"]),
        count: z.number().positive(),
    }))
});

export type RequestParamsType = z.infer<typeof RequestParams>;
export type RequestStorageParamsType = z.infer<typeof RequestParams>['storage'];
