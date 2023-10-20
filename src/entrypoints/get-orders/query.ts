import {RequestParamsType} from './model';

export const createDbQuery = ({order_id}: RequestParamsType) => `
    DECLARE $order_id AS String;

    $order_id = "${order_id}";

    SELECT * FROM \`orders\` WHERE order_id = $order_id;
`;
