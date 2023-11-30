import {CONTENT_BLOCKS} from '_consts/tables';

import {RequestParamsType} from './model';

export const createDbQuery = () => `
    DECLARE $parent_id AS String;
    DECLARE $filter AS String;
    DECLARE $category AS String;

    SELECT * FROM ${CONTENT_BLOCKS} as s
    WHERE
        IF ($parent_id = "", true, s.parent_id = $parent_id)
    ORDER BY name ASC
    LIMIT $limit
    OFFSET $offset;
`;
