import {TASK_TABLE, WATCHERS_TABLE} from '_consts/tables';

export const createDbQuery = () => `
    DECLARE $task_id AS Utf8;

    SELECT * FROM ${TASK_TABLE} WHERE task_id = $task_id;
    SELECT * FROM ${WATCHERS_TABLE} WHERE taks_id = $task_id;
`;
