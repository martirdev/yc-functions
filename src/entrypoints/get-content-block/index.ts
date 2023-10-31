import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (event, context) {
  const data = 'params' in event ? event.params : context.getPayload();
  const request = RequestParams.parse(data);

  const ydbQuery = createDbQuery(request);
  const [result] = await requestFromDB(ydbQuery);

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
