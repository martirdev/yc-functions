import {CONTENT_BLOCKS} from '_consts/tables';

export const createDbQuery = () => `
    DECLARE $block_id AS String;

    SELECT * FROM ${CONTENT_BLOCKS} WHERE block_id = $block_id;
`;
