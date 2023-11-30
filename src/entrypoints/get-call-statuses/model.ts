import {z} from 'zod';

import {checkIsDateTime} from '_utils/query';

export const RequestParams = z.object({
  filter: z.string().optional(),
  type: z.string().optional(),
  is_radio_practice: z.boolean().optional(),
  from: z.custom(checkIsDateTime),
  to: z.custom(checkIsDateTime)
});

export type RequestParamsType = z.infer<typeof RequestParams>;
