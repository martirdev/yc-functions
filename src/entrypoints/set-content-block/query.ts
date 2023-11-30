import {CONTENT_BLOCKS} from '_consts/tables';

import {RequestParamsType} from './model';

export const createDbQuery = () => `
    DECLARE $block_id AS String;
    DECLARE $section_id AS String;
    DECLARE $name AS String;
    DECLARE $content AS Optional<String>;

    -- Create/Update content block
    UPSERT INTO ${CONTENT_BLOCKS} (block_id, section_id, name, content)
    VALUES ($block_id, $section_id, $name, $content);
`;
