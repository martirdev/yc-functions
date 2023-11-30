import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  filter: z.coerce.date().optional(),
  limit: z.coerce.number().positive(),
  offset: z.coerce.number().nonnegative().optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class GetTasksRequest extends TypedData {
  @declareType(Types.optional(Types.DATETIME))
  public filter?: Date;

  @declareType(Types.optional(Types.UINT32))
  public limit: number;

  @declareType(Types.optional(Types.UINT32))
  public offset: number;

  static create(task: RequestParamsType): GetTasksRequest {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);
    this.filter = data.filter;
    this.offset = data.offset ?? 0;
    this.limit = data.limit ?? 100;
  }
}
