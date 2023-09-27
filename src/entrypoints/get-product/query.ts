import {RequestParamsType} from './model';

export const createDbQuery = ({product_id}: RequestParamsType) => `
    DECLARE $product_id AS String;

    $product_id = "${product_id}";

    SELECT * WITHOUT create_at FROM \`products\` WHERE product_id = $product_id;
    SELECT size, count FROM \`storage\` WHERE product_id = $product_id;
    SELECT position, link FROM \`photos\` WHERE product_id = $product_id;
`;
