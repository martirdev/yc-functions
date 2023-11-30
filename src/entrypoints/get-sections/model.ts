import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  parent_id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class GetSections extends TypedData {
  @declareType(Types.UTF8)
  public parent_id: string;

  static create(task: RequestParamsType): GetSections {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);
    this.parent_id = data.parent_id;
  }
}
