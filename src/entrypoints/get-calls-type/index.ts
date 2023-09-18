import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, _context) {
  const ydbQuery = createDbQuery();
  const [result] = await requestFromDB(ydbQuery);

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
