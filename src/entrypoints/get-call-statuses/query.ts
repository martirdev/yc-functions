import {RequestParamsType} from './model';

export const createDbQuery = ({is_radio_practice, filter, type, from, to}: RequestParamsType) => `
    DECLARE $is_radio_practice As Bool;
    DECLARE $filter AS String;
    DECLARE $type AS String;
    DECLARE $from AS DateTime;
    DECLARE $to as DateTime;
        
    $is_radio_practice = ${is_radio_practice || 'null'};
    $filter = "${filter || ''}";
    $type = "${type || ''}";
    $from = DateTime("${from}");
    $to = DateTime("${to}");
        
    SELECT * FROM \`calls\` AS ca
    LEFT JOIN \`clients\` AS cl USING (\`client_id\`)
    WHERE
        $from <= ca.call_id
        AND $to >= ca.call_id
        AND IF (
            $is_radio_practice IS NULL,
            true,
            IF (
                $is_radio_practice = true,
                ca.type = 'radio-practice',
                ca.type = 'common'
            )
        )
        AND IF (
            $filter = "",
            true,
            (
                FIND(cl.mo, $filter) IS NOT NULL
                OR FIND(cl.call_sign, $filter) IS NOT NULL
                OR FIND(cl.location, $filter) IS NOT NULL
                OR FIND(cl.organization, $filter) IS NOT NULL
                OR FIND(cl.unit, $filter) IS NOT NULL
                OR FIND(cl.trunk_phone, $filter) IS NOT NULL
            )
        )
        AND IF (
            $type = "",
            true,
            cl.client_type_id = $type
        );
`;
