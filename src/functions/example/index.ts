import {requestFromDB} from '@utils/db';
import {Handler} from '@yandex-cloud/function-types';

import {RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const ydbQuery = createDbQuery(request);
  const [result] = await requestFromDB(ydbQuery);

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
