import {RequestParamsType, RequestPhotosParamsType, RequestStorageParamsType} from './model';

const convertStorageInfo = (storage: RequestStorageParamsType, product_id: string) =>
  storage
    .map(({size, count}) => {
      return `("${product_id}", "${size}", ${count})`;
    })
    .join(', ');

const convertPhotosInfo = (photos: RequestPhotosParamsType, product_id: string) =>
  photos
    .map(({position, link}) => {
      return `("${product_id}", ${position}, "${link}")`;
    })
    .join(', ');

export const createDbQuery = ({
  product_id,
  category_id,
  name,
  description,
  material,
  packaging,
  delivery,
  choosing_size_guide,
  price,
  storage,
  photos
}: RequestParamsType) => `
    DECLARE $product_id AS String;
    DECLARE $category_id AS String;
    DECLARE $name AS String;
    DECLARE $material AS String;
    DECLARE $packaging AS String;
    DECLARE $delivery AS String;
    DECLARE $choosing_size_guide AS String;
    DECLARE $price AS Float;

    $product_id = "${product_id}";
    $category_id = "${category_id}";
    $name = "${name}";
    $description = "${description || ''}";
    $material = "${material || ''}";
    $packaging = "${packaging || ''}";
    $delivery = "${delivery || ''}";
    $choosing_size_guide = "${choosing_size_guide || ''}";
    $price = ${price};

    -- Create/Update product
    UPSERT INTO \`products\` (product_id, category_id, name, description, material, packaging, delivery, 
    choosing_size_guide, price, created_at)
    VALUES ($product_id, $category_id, $name, $description, $material, $packaging, $delivery, 
    $choosing_size_guide, $price, CURRENT_TIMESTAMP);
    
    -- Create/Update storage info
    UPSERT INTO \`storage\` (product_id, size, count)
    VALUES ${convertStorageInfo(storage, product_id)};
    
    -- Create/Update photos info
    UPSERT INTO \`photos\` (product_id, photos, link)
    VALUES ${convertPhotosInfo(photos, product_id)};
`;
