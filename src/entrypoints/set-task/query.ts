import {TASK_TABLE, WATCHERS_TABLE} from '_consts/tables';

export const createTask = () => `
    DECLARE $task_id AS Optional<Utf8>;
    DECLARE $author_id AS Utf8;
    DECLARE $executor_id AS Optional<Utf8>;
    DECLARE $name AS Utf8;
    DECLARE $content AS Utf8;
    DECLARE $task AS Utf8;
    DECLARE $status_task AS Utf8;
    DECLARE $planned_sp AS Optional<Uint64>;
    DECLARE $spent_sp AS Optional<Uint64>;
    DECLARE $type AS Optional<Utf8>;
    DECLARE $create_at AS DateTime;
    DECLARE $watchers AS Optional<List<Utf8>>;

    $create_at = SELECT create_at FROM ${TASK_TABLE} WHERE task_id = $task_id;
    $content_block_counts = SELECT COUNT(*) FROM ${TASK_TABLE};

    $new_task_id = COALESCE($task_id, CAST($content_block_counts AS Utf8), "0");
    $new_watchers = COALESCE($watchers, ListCreate(Utf8));
    $new_create_at = COALESCE($create_at, CurrentUtcDatetime());
    $closed_at = IF($status_task = 'done', CurrentUtcDatetime(), null);
  
    -- Create/Update tasks
    $task_table = AsList(AsStruct(
      $new_task_id AS task_id,
      $author_id AS author_id,
      $executor_id AS executor_id,
      $name AS name,
      $content AS content,
      $task AS task,
      $status_task AS status_task,
      $planned_sp AS planned_sp,
      $spent_sp AS spent_sp,
      $new_create_at AS create_at,
      CurrentUtcDatetime() AS update_at,
      $type AS type,
      $closed_at AS close_at,
    ));

    UPSERT INTO ${TASK_TABLE} SELECT * FROM AS_TABLE($task_table);

    -- Remove old values
    DELETE FROM ${WATCHERS_TABLE} WHERE task_id = $new_task_id;
    
    $watchers_table = ListMap($new_watchers, ($item) -> {
      return AsStruct($item AS user_id, $new_task_id AS task_id);
    });

    -- Insert new watchers
    UPSERT INTO ${WATCHERS_TABLE} SELECT * FROM AS_TABLE($watchers_table);

    SELECT * FROM AS_TABLE($task_table);
    SELECT user_id FROM AS_TABLE($watchers_table);
`;
