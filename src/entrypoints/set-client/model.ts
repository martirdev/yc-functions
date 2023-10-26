import {z} from 'zod';

export const RequestParams = z.object({
  client_id: z.string(),
  call_sign: z.string().optional(),
  client_type_id: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  mo: z.string().optional(),
  organization: z.string().optional(),
  responsible: z.string().optional(),
  responsible_phone: z.string().optional(),
  trunk_phone: z.string().optional(),
  unit: z.string().optional(),
  times: z.array(z.object({
    time: z.number().positive(),
    schedule: z.array(z.number().min(1).max(7)),	
    type: z.enum(['common', 'radio-practice']),
    group_name: z.string().optional(),
  }))
});

export type RequestParamsType = z.infer<typeof RequestParams>;
export type RequestTimesParamsType = z.infer<typeof RequestParams>['times'];
