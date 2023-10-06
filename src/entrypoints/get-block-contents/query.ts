import {RequestParamsType} from './model';

export const createDbQuery = ({parent_id, limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $parent_id AS String;
    DECLARE $filter AS String;
    DECLARE $category AS String;

    $category = "${parent_id || ''}";
    $limit = ${limit};
    $offset = ${offset};

    SELECT * FROM \`content-block\` as s
    WHERE
        IF ($parent_id = "", true, s.parent_id = $parent_id)
    ORDER BY name ASC
    LIMIT $limit
    OFFSET $offset;
`;
