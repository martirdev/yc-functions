import {RequestParamsType} from './model';

export const createDbQuery = ({filter, type, limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $filter AS String;
    DECLARE $type AS String;

    $filter = "${filter || ''}";
    $type = "${type || ''}";
    $limit = ${limit};
    $offset = ${offset};

    SELECT * FROM \`clients\` as c
    WHERE
        IF ($filter = "",
            true,
            (
                FIND(c.mo, $filter) IS NOT NULL
                OR FIND(c.call_sign, $filter) IS NOT NULL
                OR FIND(c.location, $filter) IS NOT NULL
                OR FIND(c.organization, $filter) IS NOT NULL
                OR FIND(c.unit, $filter) IS NOT NULL
                OR FIND(c.trunk_phone, $filter) IS NOT NULL
            )
        )
        AND IF ($type = "", true, c.client_type_id = $type)
    ORDER BY location ASC
    LIMIT $limit
    OFFSET $offset;
`;
