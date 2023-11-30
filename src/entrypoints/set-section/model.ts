import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  section_id: z.string(),
  parent_id: z.string().optional(),
  name: z.string()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class CreateSection extends TypedData {
  @declareType(Types.UTF8)
  public parent_id: string;

  @declareType(Types.UTF8)
  public section_id: string;

  @declareType(Types.UTF8)
  public name: string;

  static create(task: RequestParamsType): CreateSection {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);
    this.parent_id = data.parent_id ?? '';
    this.section_id = data.section_id;
    this.name = data.name;
  }
}
