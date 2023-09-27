import {RequestParamsType} from './model';

export const createDbQuery = ({block_id, section_id, name, content}: RequestParamsType) => `
    DECLARE $block_id AS String;
    DECLARE $section_id AS String;
    DECLARE $name AS String;
    DECLARE $content AS String;

    $block_id = "${block_id}";
    $section_id = "${section_id}";
    $name = ${name};
    $content = ${content};

    -- Create/Update content block
    UPSERT INTO \`content-blocks\` (block_id, section_id, name, content)
    VALUES ($block_id, $section_id, $name, $content);
`;
