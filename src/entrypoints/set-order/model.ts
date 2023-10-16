import {z} from 'zod';

export const RequestParams = z.object({
    order_id: z.string(),
    delivery: z.string(),
    full_name_customer: z.string(),
    email: z.string().optional(),
    phone: z.string(),
    region: z.string(),
    city: z.string(),
    street: z.string(),
    house: z.string(),
    flat: z.string(),
    index: z.string(),
    products: z
        .array(
            z.object({
                product_id: z.string(),
                size: z.enum(['NoSize', 'XS', 'S', 'M', 'L', 'XL']),
                count: z.number().positive(),
                total_price: z.number()
            })
        )
        .optional(),
});

export type RequestParamsType = z.infer<typeof RequestParams>;
export type RequestProductsParamsType = z.infer<typeof RequestParams>['products'];
