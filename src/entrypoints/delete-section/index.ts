import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {DeleteSection, RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const typedRequest = new DeleteSection(request);
  const ydbQuery = createDbQuery();
  await requestFromDB({
    request: ydbQuery,
    params: {
      $section_id: typedRequest.getTypedValue('section_id')
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify('Ok')
  };
};
