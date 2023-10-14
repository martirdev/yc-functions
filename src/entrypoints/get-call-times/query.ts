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

    $grep = Re2::Grep($filter, Re2::Options(false AS CaseSensitive));

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
                $grep(c.mo)
                OR $grep(c.call_sign)
                OR $grep(c.location)
                OR $grep(c.organization)
                OR $grep(c.unit)
                OR $grep(c.trunk_phone)
            )
        )
        AND IF ($type = "", true, c.client_type_id = $type)
    ORDER BY client_call_id ASC, location ASC
    LIMIT $limit
    OFFSET $offset;
`;
