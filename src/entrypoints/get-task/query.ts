import {RequestParamsType} from './model';

export const createDbQuery = ({task_id}: RequestParamsType) => `
    DECLARE $task_id AS String;

    $task_id = "${task_id}";
    SELECT * FROM \`tasks\` WHERE task_id = $task_id;
`;
