import {RequestParamsType} from './model';

export const createDbQuery = ({section_id, parent_id, name}: RequestParamsType) => `
    DECLARE $parent_id AS String;
    DECLARE $section_id AS String;
    DECLARE $name AS String;

    $section_id = "${section_id}";
    $parent_id = "${parent_id || ''}";
    $name = "${name}";

    -- Create/Update section
    UPSERT INTO \`sections\` (section_id, parent_id, name)
    VALUES ($section_id, $parent_id, $name);
`;
