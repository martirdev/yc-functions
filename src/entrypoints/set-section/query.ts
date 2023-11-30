import {SECTIONS} from '_consts/tables';

export const createDbQuery = () => `
    DECLARE $parent_id AS String;
    DECLARE $section_id AS String;
    DECLARE $name AS String;

    -- Create/Update section
    UPSERT INTO ${SECTIONS} (section_id, parent_id, name)
    VALUES ($section_id, $parent_id, $name);
`;
