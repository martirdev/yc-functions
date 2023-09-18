import {z} from 'zod';

import {checkIsDate} from '_utils/query';

export const RequestParams = z.object({
  filter: z.string().optional(),
  type: z.string().optional(),
  is_radio_practice: z.boolean().optional(),
  from: z.custom(checkIsDate),
  to: z.custom(checkIsDate)
});

export type RequestParamsType = z.infer<typeof RequestParams>;
