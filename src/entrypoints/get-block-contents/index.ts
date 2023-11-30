import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {GetContents, RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const typedRequest = new GetContents(request);
  const ydbQuery = createDbQuery();
  const [result] = await requestFromDB({
    request: ydbQuery,
    params: {
      $parent_id: typedRequest.getTypedValue('parent_id'),
      $limit: typedRequest.getTypedValue('limit'),
      $offset: typedRequest.getTypedValue('offset')
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
