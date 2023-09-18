import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const ydbQuery = createDbQuery(request);
  const [result] = await requestFromDB(ydbQuery);

  const clientWithTimes = result.map(item => ({...item, schedule: JSON.parse(item.schedule)}));

  return {
    statusCode: 200,
    body: JSON.stringify(clientWithTimes)
  };
};
