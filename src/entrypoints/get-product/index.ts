import {Handler} from '@yandex-cloud/function-types';

import {requestFromDB} from '_utils/db';

import {createDbQuery} from './query';
import { RequestParams } from './model';

export const handler: Handler.Http = async function (_event, context) {
    const data = context.getPayload();
    const request = RequestParams.parse(data);

    const ydbQuery = createDbQuery(request);

    const [products, storages] = await requestFromDB(ydbQuery);

    const product_storage = storages.map(storage => Object.assign({}, storage, 
        {size: storage.size, count: storage.count}));
    const result = Object.assign({}, products[0], {storage: product_storage});

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
};
;
