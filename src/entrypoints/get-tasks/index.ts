import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {GetTasksRequest, RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (event) {
  const query = event.queryStringParameters;
  const request = RequestParams.parse(query);

  const ydbQuery = createDbQuery();

  const typedTask = new GetTasksRequest(request);
  const [rawTasks] = await requestFromDB({
    request: ydbQuery,
    params: {
      $filter: typedTask.getTypedValue('filter'),
      $limit: typedTask.getTypedValue('limit'),
      $offset: typedTask.getTypedValue('offset')
    }
  });
  const tasks = GetTasksRequest.createNativeObjects(rawTasks);

  return {
    statusCode: 200,
    body: JSON.stringify(tasks)
  };
};
