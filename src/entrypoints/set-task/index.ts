import {Handler} from '@yandex-cloud/function-types/dist/src';
import {assign} from 'lodash-es';

import {requestFromDB} from '_utils/db';

import {CreateTask, RequestParams} from './model';
import {createTask} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const typedTask = new CreateTask(request);
  const [rawTasks, rawWatchers] = await requestFromDB({
    request: createTask(),
    params: {
      $task_id: typedTask.getTypedValue('task_id'),
      $author_id: typedTask.getTypedValue('author_id'),
      $executor_id: typedTask.getTypedValue('executor_id'),
      $name: typedTask.getTypedValue('name'),
      $content: typedTask.getTypedValue('content'),
      $task: typedTask.getTypedValue('task'),
      $status_task: typedTask.getTypedValue('status_task'),
      $planned_sp: typedTask.getTypedValue('planned_sp'),
      $spent_sp: typedTask.getTypedValue('spent_sp'),
      $type: typedTask.getTypedValue('type'),
      $watchers: typedTask.getTypedValue('watchers')
    }
  });

  const [task] = CreateTask.createNativeObjects(rawTasks);
  const watchers = CreateTask.createNativeObjects(rawWatchers);

  return {
    statusCode: 200,
    body: JSON.stringify(assign({}, task, {watchers: watchers.map(({user_id}) => user_id)}))
  };
};
