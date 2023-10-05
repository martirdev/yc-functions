import {RequestParamsType} from './model';

export const createDbQuery = ({
  task_id,
  author_id,
  executor_id,
  name,
  content,
  task,
  status_task,
  planned_sp,
  spent_sp,
  type_task_id
}: RequestParamsType) => `
    DECLARE $task_id AS String;
    DECLARE $section_id AS String;
    DECLARE $executor_id AS String;
    DECLARE $name AS String;
    DECLARE $content AS String;
    DECLARE $task AS String;
    DECLARE $status_task AS String;
    DECLARE $planned_sp AS Uint64;
    DECLARE $spent_sp AS Uint64;;
    DECLARE $type_task_id AS String;

    $task_id = "${task_id}";
    $author_id = "${author_id}";
    $executor_id = "${executor_id || ''}";
    $name = "${name}";
    $content = "${content || ''}";
    $task = "${task || ''}";
    $status_task = "${status_task || 'Открыт'}";
    $planned_sp = ${planned_sp || null};
    $spent_sp = ${spent_sp || null};
    $type_task_id = "${type_task_id || ''}";

    
    -- Create/check create_at
    $create_at = (SELECT create_at FROM \`tasks\` WHERE task_id = $task_id);
    
    -- Create/Update tasks
    UPSERT INTO \`tasks\` (task_id, author_id, executor_id, name, content, task, status_task, planned_sp,
    spent_sp, create_at, update_at, type_task_id)
    VALUES ($task_id, $author_id, $executor_id, $name, $content, $task, $status_task, $planned_sp, $spent_sp, 
    IF($create_at IS NULL, CurrentUtcDatetime(), $create_at), CurrentUtcDatetime(), $type_task_id);
`;

export const createDbQueryAddWatcher = (task_id, user_id) => `
    DECLARE $task_id AS String;
    DECLARE $user_id AS String;
    
    $task_id = "${task_id}";
    $user_id = "${user_id}";
    
    -- Create/Update watchers author
    UPSERT INTO \`watchers\` (task_id, user_id)
    VALUES ($task_id, $user_id);
`;
