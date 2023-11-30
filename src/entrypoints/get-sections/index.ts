import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {GetSections, RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const typedSections = new GetSections(request);
  const ydbQuery = createDbQuery();
  const [result] = await requestFromDB({
    request: ydbQuery,
    params: {
      $typedSections: typedSections.getTypedValue('parent_id')
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({result})
  };
};
