import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {CreateSection, RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);
  const createSection = new CreateSection(request);
  const ydbQuery = createDbQuery();
  await requestFromDB({
    request: ydbQuery,
    params: {
      $parent_id: createSection.getTypedValue('parent_id'),
      $section_id: createSection.getTypedValue('section_id'),
      $name: createSection.getTypedValue('name')
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify('Ok')
  };
};
