import {SECTIONS} from '_consts/tables';

export const createDbQuery = () => `
DECLARE $product_id AS String;

DELETE from ${SECTIONS}
WHERE section_id = $section_id;
`;
