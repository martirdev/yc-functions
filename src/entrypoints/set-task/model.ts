import {z} from 'zod';

export const RequestParams = z.object({
  task_id: z.string(),
  author_id: z.string(),
  executor_id: z.string().optional(),
  name: z.string(),
  context: z.string().optional(),
  task: z.string().optional(),
  status_task: z.enum(['Открыт', 'В работе', 'Ждет проверки', 'Закрыт', 'Требуется информация', 'В беклог']),
  planned_sp: z.number().positive().optional(),
  spent_sp: z.number().positive().optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;
