import {RequestParamsType} from './model';

export const createDbQuery = ({product_id}: RequestParamsType) => `
    DECLARE $product_id AS String;

    $product_id = "${product_id}";

    SELECT * FROM \`products\` WHERE product_id = $product_id;
    SELECT * FROM \`storage\` WHERE product_id = $product_id;
`;
