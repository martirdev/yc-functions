import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery, createDbQueryByStorageAndPhoto} from './query';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const ydbQuery = createDbQuery(request);
  const results = [];
  const [result] = await requestFromDB(ydbQuery);
  for (const value of result) {
    const query = createDbQueryByStorageAndPhoto(value.product_id);
    const [storages, photos] = await requestFromDB(query);
    results.push(Object.assign({}, value, {storage: storages}, {photos: photos}));
  }
  return {
    statusCode: 200,
    body: JSON.stringify(results)
  };
};
