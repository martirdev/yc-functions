import {RequestParamsType} from './model';

export const createDbQuery = ({client_id}: RequestParamsType) => `
    DECLARE $client_id AS String;

    $client_id = "${client_id}";

    SELECT * FROM \`clients\` WHERE client_id = $client_id;
    SELECT * FROM \`client-call-times\` WHERE client_id = $client_id;
`;
