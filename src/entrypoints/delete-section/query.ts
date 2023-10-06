import {RequestParamsType} from './model';

export const createDbQuery = ({section_id}: RequestParamsType) => `
DECLARE $product_id AS String;
$section_id = "${section_id}";
Delete from \`sections\`
Where section_id=$section_id
`;
