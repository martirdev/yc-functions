import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, createDbQueryAddWatcher} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);
  const ydbQuery = createDbQuery(request);
  await requestFromDB(ydbQuery)

  if (request.author_id.toString() != ''){
    const query = createDbQueryAddWatcher(request.task_id, request.author_id);
    await requestFromDB(query);
    
  }
  if (request.executor_id.toString() != ''){
    const query = createDbQueryAddWatcher(request.task_id, request.executor_id);
    await requestFromDB(query);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify('Ok')
  };
};
