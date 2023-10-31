import {RequestParamsType} from './model';

export const createDbQuery = ({task_id}: RequestParamsType) => `
    DECLARE $task_id AS String;

    $task_id = "${task_id}";

    SELECT * FROM \`comments\` 
    WHERE task_id = $task_id    
    ORDER BY create_at ASC;
`;
