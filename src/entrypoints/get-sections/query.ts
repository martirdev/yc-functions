import {RequestParamsType} from './model';

export const createDbQuery = ({parent_id}: RequestParamsType) => `
    DECLARE $parent_id AS String;

    $parent_id = "${parent_id}";

    SELECT * FROM \`sections\` WHERE parent_id = $parent_id;
`;
