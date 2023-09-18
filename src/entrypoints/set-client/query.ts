import {RequestParamsType, RequestTimesParamsType} from './model';

const convertToClientTime = (times: RequestTimesParamsType, client_id: string) => times.map(({time, type, schedule}) => {
    return `(${time}, "${client_id}", Json("[${schedule.join(',')}]"), "${type}")`
}).join(', ')

export const createDbQuery = ({
  client_id,
  call_sign,
  client_type_id,
  description,
  location,
  mo,
  organization,
  responsible,
  responsible_phone,
  trunk_phone,
  unit,
  times
}: RequestParamsType) => `
    DECLARE $client_id AS String;
    DECLARE $call_sign AS String;
    DECLARE $client_type_id AS String;
    DECLARE $description AS String;
    DECLARE $location AS String;
    DECLARE $mo AS String;
    DECLARE $organization AS String;
    DECLARE $responsible AS String;
    DECLARE $responsible_phone AS String;
    DECLARE $trunk_phone AS String;
    DECLARE $unit AS String;

    $client_id = "${client_id}";
    $call_sign = "${call_sign || ''}";
    $client_type_id = "${client_type_id || ''}";
    $description = "${description || ''}";
    $location = "${location || ''}";
    $mo = "${mo || ''}";
    $organization = "${organization || ''}";
    $responsible = "${responsible || ''}";
    $responsible_phone = "${responsible_phone || ''}";
    $trunk_phone = "${trunk_phone || ''}";
    $unit = "${unit || ''}";
    $new_times_ids = AsList(${times.map(({time}) => time).join(',')});

    -- Create/Update client
    UPSERT INTO \`clients\` (client_id, call_sign, client_type_id, description, location, mo, organization, responsible, responsible_phone, trunk_phone, unit)
    VALUES (
        $client_id,
        $call_sign,
        $client_type_id,
        $description,
        $location,
        $mo,
        $organization,
        $responsible,
        $responsible_phone,
        $trunk_phone,
        $unit
    );

    -- Get all previous call times
    $to_delete = (
        SELECT client_call_id, client_id FROM \`client-call-times\` WHERE client_id = $client_id AND NOT ListHas($new_times_ids, client_call_id)
    );

    -- Insert new call times
    UPSERT INTO \`client-call-times\` (client_call_id, client_id, schedule, type)
    VALUES ${convertToClientTime(times, client_id)};

    -- Delete previous call times
    DELETE FROM \`client-call-times\` ON 
    SELECT * FROM $to_delete;
`;
