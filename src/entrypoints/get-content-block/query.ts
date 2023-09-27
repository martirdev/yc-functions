import {RequestParamsType} from './model';

export const createDbQuery = ({block_id}: RequestParamsType) => `
    DECLARE $block_id AS String;

    $block_id = "${block_id}";

    SELECT * FROM \`content-blocks\` WHERE block_id = $block_id;
`;
