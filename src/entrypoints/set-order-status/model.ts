import {z} from 'zod';

export const RequestParams = z.object({
    order_id: z.string(),
    status: z.enum(['В обработке', 'Требуется информация', 'В сборке', 'Готов к получению', 'В службе доставки',
'Заказ выполнен'])
});

export type RequestParamsType = z.infer<typeof RequestParams>;
