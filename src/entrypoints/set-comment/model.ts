import {z} from 'zod';

export const RequestParams = z.object({
  comment_id: z.string(),
  task_id: z.string(),
  user_id: z.string(),
  context: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
