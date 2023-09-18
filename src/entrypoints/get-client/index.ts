import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const ydbQuery = createDbQuery(request);
  const [clients, times] = await requestFromDB(ydbQuery);

  const timesWithSchedule = times.map(time => Object.assign({}, time, {schedule: JSON.parse(time.schedule)}));
  const client = Object.assign({}, clients[0], {times: timesWithSchedule});

  return {
    statusCode: 200,
    body: JSON.stringify({client})
  };
};
