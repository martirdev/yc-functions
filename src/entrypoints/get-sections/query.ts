import {SECTIONS} from '_consts/tables';

import {RequestParamsType} from './model';

export const createDbQuery = () => `
    DECLARE $parent_id AS String;

    SELECT * FROM ${SECTIONS} WHERE parent_id = $parent_id;
`;
