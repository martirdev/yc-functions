import {RequestParamsType, RequestProductsParamsType} from './model';

const convertProductsInfo = (products: RequestProductsParamsType, order_id:string) =>
    products
        .map(({product_id, size, count, total_price}) => {
            return `("${order_id}","${product_id}", "${size}", ${count}, ${total_price})`;
        })
        .join(', ');

export const createDbQuery = ({
                                  order_id,
                                  delivery,
                                  full_name_customer,
                                  email,
                                  phone,
                                  region,
                                  city,
                                  street,
                                  house,
                                  flat,
                                  index,
                                  products
                              }: RequestParamsType) => `
    DECLARE $order_id AS String;
    DECLARE $delivery AS String;
    DECLARE $full_name_customer AS String;
    DECLARE $email AS String;
    DECLARE $phone AS String;
    DECLARE $region AS String;
    DECLARE $city AS String;
    DECLARE $street AS String;
    DECLARE $house AS String;
    DECLARE $flat AS String;
    DECLARE $index AS String;
    
    $order_id = "${order_id}";
    $delivery = "${delivery}";
    $full_name_customer = "${full_name_customer}";
    $email = "${email}";
    $phone = "${phone}";
    $region= "${region}";
    $city = "${city}";
    $street = "${street}";
    $house = "${house}";
    $flat = "${flat}";
    $index = "${index}";

    -- Create product
    INSERT  INTO \`orders\` (order_id, delivery, full_name_customer, email, phone, region, city, street, house, flat,
    index)
    VALUES ($order_id, $delivery, $full_name_customer, $email, $phone, $region, $city, $street, $house, $flat,
    $index);
    
    -- Create orders-products info
    INSERT  INTO \`orders-products\` (order_id, product_id, size, count, total_price)
    VALUES ${convertProductsInfo(products, order_id)};
    
    $status = "В обработке";
    
    -- Create orders-status info
    INSERT  INTO \`orders-status\` (order_status_id, order_id, status, date)
    VALUES (CAST(RandomUuid(1234) AS String), $order_id, $status, CurrentUtcDate());
`;
