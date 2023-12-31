﻿import {RequestParamsType} from './model';

export const createDbQuery = ({filter, category, limit = 20, offset = 0}: RequestParamsType) => `
    DECLARE $limit AS Uint32;
    DECLARE $offset AS Uint32;
    DECLARE $filter AS String;
    DECLARE $category AS String;

    $filter = "${filter || ''}";
    $category = "${category || ''}";
    $limit = ${limit};
    $offset = ${offset};

    SELECT * FROM \`products\` as p
    WHERE
        IF ($filter = "", true, FIND(p.name, $filter) IS NOT NULL)
        AND IF ($category = "", true, p.category_id = $category)
    ORDER BY create_at ASC
    LIMIT $limit
    OFFSET $offset;
`;

export const createDbQueryByStorageAndPhoto = product_id => `
    DECLARE $product_id AS String;

    $product_id = "${product_id}";

    SELECT size, count FROM storage WHERE product_id = $product_id;
    SELECT position, link FROM photos WHERE product_id = $product_id;
`;
