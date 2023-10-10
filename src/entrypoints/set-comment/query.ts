import {RequestParamsType} from './model';

export const createDbQuery = ({comment_id, task_id, user_id, context, create_at, update_at}: RequestParamsType) => `
    DECLARE $comment_id AS String;
    DECLARE $task_id AS String;
    DECLARE $user_id AS String;
    DECLARE $context AS String;

    $comment_id = "${comment_id}";
    $task_id = "${task_id}";
    $user_id = "${user_id}";
    $context = "${context}";
    
    -- Create/check create_at
    $create_at = (SELECT create_at FROM \`comments\` WHERE comment_id = $comment_id);
    
    -- Create/Update comments
    UPSERT INTO \`comments\` (comment_id, task_id, user_id, context, create_at, update_at)
    VALUES ($comment_id, $task_id, $user_id, $context, IF($create_at IS NULL, CurrentUtcDatetime(), $create_at),
     CurrentUtcDatetime());
`;
