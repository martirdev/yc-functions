import {RequestParamsType} from './model';

export const createDbQuery = ({order_id, status}: RequestParamsType) => `
    DECLARE $order_id AS String;
    DECLARE $status AS String;
    
    $order_id = "${order_id}";
    $status = "${status}";

    -- Create orders-status info
    INSERT  INTO \`orders-status\` (order_status_id, order_id, status, date)
    VALUES (CAST(RandomUuid(1234) AS String), $order_id, $status, CurrentUtcDatetime());
`;
