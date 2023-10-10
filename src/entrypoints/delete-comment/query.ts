import {RequestParamsType} from './model';

export const createDbQuery = ({comment_id}: RequestParamsType) => `
DECLARE $comment_id AS String;
$comment_id = "${comment_id}";
Delete from \`comments\`
Where comment_id=$comment_id
`;
