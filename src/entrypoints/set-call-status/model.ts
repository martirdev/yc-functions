import {z} from 'zod';

import {checkIsDate} from '_utils/query';

export const RequestParams = z.object({
  comment: z.string().optional(),
  call_id: z.custom(checkIsDate),
  client_id: z.string(),
  calls_type_id: z.string(),
  type: z.enum(['radio-practice', 'common'] as const)
});

export type RequestParamsType = z.infer<typeof RequestParams>;
