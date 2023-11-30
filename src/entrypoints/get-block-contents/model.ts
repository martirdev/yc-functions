import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  parent_id: z.string().optional(),
  limit: z.number(),
  offset: z.number()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class GetContents extends TypedData {
  @declareType(Types.UTF8)
  public parent_id: string;

  @declareType(Types.UTF8)
  public limit: string;

  @declareType(Types.UTF8)
  public offset: string;

  static create(task: RequestParamsType): GetContents {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);

    this.parent_id = data.parent_id ?? '';
    this.limit = data.limit.toString() ?? '20';
    this.offset = data.offset.toString() ?? '0';
  }
}
