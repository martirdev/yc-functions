import moment from 'moment';

export const checkIsDateTime = (val: unknown) =>
  typeof val === 'string' && moment(val, 'YYYY-MM-DDTHH:mm:ss\\Z', true).isValid();

export const checkIsDate = (val: unknown) => typeof val === 'string' && moment(val, 'YYYY-MM-DD', true).isValid();
