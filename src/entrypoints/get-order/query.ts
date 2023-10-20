import {RequestParamsType} from './model';

export const createDbQuery = ({order_id}: RequestParamsType) => `
    DECLARE $order_id AS String;

    $order_id = "${order_id}";

    SELECT * FROM \`orders\` WHERE order_id = $order_id;
    SELECT status FROM \`orders-status\` WHERE order_id = $order_id Order by date;
    SELECT * Without order_id FROM \`orders-products\` WHERE order_id = $order_id;
`;
