import {RequestParamsType} from './model';

export const createDbQuery = ({filter, type, limit = 20, offset = 0, is_radio_practice}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $filter AS String;
    DECLARE $type AS String;
    DECLARE $is_radio_practice AS Bool;

    $filter = "${filter || ''}";
    $type = "${type || ''}";
    $limit = ${limit};
    $offset = ${offset};
    $is_radio_practice = ${is_radio_practice || 'null'};

    SELECT * FROM \`client-call-times\` AS t
    LEFT JOIN clients AS c USING (\`client_id\`)
    WHERE
        IF ($is_radio_practice IS NULL,
            true,
            IF ($is_radio_practice = true, t.type = 'radio-practice', t.type = 'common')
        )
        AND IF ($filter = "",
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
    ORDER BY client_call_id ASC, location ASC
    LIMIT $limit
    OFFSET $offset;
`;
