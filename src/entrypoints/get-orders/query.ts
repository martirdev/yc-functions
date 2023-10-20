import {RequestParamsType} from './model';

export const createDbQuery = ({filter, limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $filter AS String;

    $limit = ${limit};
    $offset = ${offset};

    SELECT * FROM \`orders\` as c
    LIMIT $limit
    OFFSET $offset;
`;
