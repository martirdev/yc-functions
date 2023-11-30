import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  task_id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class GetTaskRequest extends TypedData {
  @declareType(Types.UTF8)
  public task_id: string;

  static create(task: RequestParamsType): GetTaskRequest {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);
    this.task_id = data.task_id;
  }
}
