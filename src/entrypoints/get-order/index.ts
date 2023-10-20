import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {RequestParams} from './model';
import {createDbQuery} from './query';

export const handler: Handler.Http = async function (_event, context) {
    const data = context.getPayload();
    const request = RequestParams.parse(data);

    const ydbQuery = createDbQuery(request);
    const [orders, status, products] = await requestFromDB(ydbQuery);

    const result = Object.assign(orders[0], status[0], {products: products});

    return {
        statusCode: 200,
        body: JSON.stringify({result})
    };
};
