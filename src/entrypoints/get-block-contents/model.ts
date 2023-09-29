﻿import {z} from 'zod';

export const RequestParams = z.object({
  parent_id: z.string().optional(),
  limit: z.number(),
  offset: z.number()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
