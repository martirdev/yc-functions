import {TASK_TABLE} from '_consts/tables';

export const createDbQuery = () => `
    DECLARE $limit AS Optional<Uint32>;
    DECLARE $offset AS Optional<Uint32>;
    DECLARE $filter AS Optional<DateTime>;

    SELECT * FROM ${TASK_TABLE} as c
    WHERE
        IF ($filter is NULL, true, c.close_at is NULL OR c.close_at > $filter)
    ORDER BY create_at DESC
    LIMIT $limit
    OFFSET $offset;
`;
