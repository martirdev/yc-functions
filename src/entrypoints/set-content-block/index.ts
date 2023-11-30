import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {CreateContent, RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);
  const typedContent = new CreateContent(request);
  const ydbQuery = createDbQuery();

  await requestFromDB({
    request: ydbQuery,
    params: {
      $block_id: typedContent.getTypedValue('block_id'),
      $name: typedContent.getTypedValue('name'),
      $section_id: typedContent.getTypedValue('section_id'),
      $content: typedContent.getTypedValue('content')
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify('Ok')
  };
};
