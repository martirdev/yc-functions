import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  section_id: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class DeleteSection extends TypedData {
  @declareType(Types.UTF8)
  public section_id: string;

  static create(task: RequestParamsType): DeleteSection {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);

    this.section_id = data.section_id;
  }
}
