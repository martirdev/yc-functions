import {TypedData, Types, declareType} from 'ydb-sdk';
import {z} from 'zod';

export const RequestParams = z.object({
  block_id: z.string(),
  name: z.string(),
  section_id: z.string(),
  content: z.string().optional()
});

export type RequestParamsType = z.infer<typeof RequestParams>;

export class CreateContent extends TypedData {
  @declareType(Types.UTF8)
  public block_id: string;

  @declareType(Types.UTF8)
  public name: string;

  @declareType(Types.UTF8)
  public section_id: string;

  @declareType(Types.optional(Types.UTF8))
  public content?: string;

  static create(task: RequestParamsType): CreateContent {
    return new this(task);
  }

  constructor(data: RequestParamsType) {
    super(data);

    this.block_id = data.block_id;
    this.name = data.name;
    this.section_id = data.section_id;
    this.content = data.content;
  }
}
