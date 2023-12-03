import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  task_id: z.string().optional(),
  type: z.string(),
  author_id: z.string(),
  executor_id: z.string().optional(),
  name: z.string(),
  content: z.string(),
  task: z.string(),
  status_task: z.enum(['opened', 'in-progress', 'in-review', 'done']),
  planned_sp: z.number().positive().optional(),
  spent_sp: z.number().positive().optional(),
  watchers: z.array(z.string()).optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class CreateTask extends TypedData {
  @declareType(Types.optional(Types.UTF8))
  public task_id?: string;

  @declareType(Types.optional(Types.UTF8))
  public executor_id?: string;

  @declareType(Types.UTF8)
  public name: string;

  @declareType(Types.UTF8)
  public content: string;

  @declareType(Types.UTF8)
  public task: string;

  @declareType(Types.UTF8)
  public status_task: string;

  @declareType(Types.optional(Types.UINT64))
  public planned_sp?: number;

  @declareType(Types.optional(Types.UINT64))
  public spent_sp?: number;

  @declareType(Types.optional(Types.UTF8))
  public type?: string;

  @declareType(Types.optional(Types.list(Types.UTF8)))
  public watchers?: string[];

  @declareType(Types.UTF8)
  public author_id: string;

  static create(task: RequestParamsType): CreateTask {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);
    this.task_id = data.task_id;
    this.type = data.type;
    this.author_id = data.author_id;
    this.executor_id = data.executor_id;
    this.name = data.name;
    this.content = data.content;
    this.task = data.task;
    this.status_task = data.status_task;
    this.planned_sp = data.planned_sp;
    this.spent_sp = data.spent_sp;
    this.watchers = data.watchers;
  }
}
