import {Handler} from '@yandex-cloud/function-types/dist/src';
import {assign} from 'lodash-es';

import {requestFromDB} from '_utils/db';

import {GetTaskRequest, RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (event) {
  const query = event.queryStringParameters;
  const request = RequestParams.parse(query);

  const typedTask = new GetTaskRequest(request);
  const [rawTasks, rawWatchers] = await requestFromDB({
    request: createDbQuery(),
    params: {
      $task_id: typedTask.getTypedValue('task_id')
    }
  });
  const [task] = GetTaskRequest.createNativeObjects(rawTasks);
  const watchers = GetTaskRequest.createNativeObjects(rawWatchers);

  return {
    statusCode: 200,
    body: JSON.stringify(assign({}, task, {watchers: watchers.map(({user_id}) => user_id)}))
  };
};
