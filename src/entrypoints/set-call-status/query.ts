import {RequestParamsType} from './model';

export const createDbQuery = ({comment, call_id, client_id, calls_type_id, type}: RequestParamsType) => `
    DECLARE $comment AS String;
    DECLARE $call_id AS DateTime;
    DECLARE $client_id AS String;
    DECLARE $type AS String;
    DECLARE $calls_type_id AS String;

    $comment = "${comment || ''}";
    $call_id = DateTime("${call_id}");
    $client_id = "${client_id}";
    $type = "${type}";
    $calls_type_id = "${calls_type_id}";

    UPSERT INTO \`calls\` (comment, call_id, client_id, type, calls_type_id)
    VALUES ($comment, $call_id, $client_id, $type, $calls_type_id);
`;
