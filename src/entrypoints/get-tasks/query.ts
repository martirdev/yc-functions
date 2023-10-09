import {RequestParamsType} from './model';

export const createDbQuery = ({filter, limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $filter AS String;

    $filter = ${filter || '1972-01-01'};
    $limit = ${limit};
    $offset = ${offset};

    SELECT * FROM \`tasks\` as c
    WHERE
        IF ($filter = "1972-01-01",
            true,
            close_at < Date($filter)
        )
    ORDER BY create_at ASC
    LIMIT $limit
    OFFSET $offset;
`;
