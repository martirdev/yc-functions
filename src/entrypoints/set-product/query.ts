import {RequestParamsType, RequestStorageParamsType} from './model';

const convertStorageInfo = (storage: RequestStorageParamsType, product_id: string) => 
    storage.map(({size,count}) => 
    {return `("${product_id}", "${size}", "${count}")`}).join(', ')

export const createDbQuery = ({product_id, category_id, name, description, material, packaging, delivery, 
                                  choosing_size_guide, price, storage}: RequestParamsType) => `
    DECLARE $product_id AS String;
    DECLARE $category_id AS String;
    DECLARE $name AS String;
    DECLARE $type AS String;
    DECLARE $material AS String;
    DECLARE $packaging AS String;
    DECLARE $delivery AS String;
    DECLARE $choosing_size_guide AS String;
    DECLARE $price AS String;

    $product_id = "${product_id}";
    $category_id = "${category_id}";
    $name = "${name}";
    $description = "${description || ''}";
    $material = "${material || ''}";
    $packaging = "${packaging || ''}";
    $delivery = "${delivery || ''}";
    $choosing_size_guide = "${choosing_size_guide || ''}";
    $price = "${price}";

    -- Create/Update product
    UPSERT INTO \`products\` (product_id, category_id, name, description, material, packaging, delivery, 
    choosing_size_guide, price)
    VALUES ($product_id, $category_id, $name, $description, $material, $packaging, $delivery, 
    $choosing_size_guide, $price);
    
    -- Create/Update storage info
    UPSERT INTO \`storage\` (product_id, size, count)
    VALUES ${convertStorageInfo(storage, product_id)};
`;
