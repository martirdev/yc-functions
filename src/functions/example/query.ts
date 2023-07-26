import {RequestParamsType} from './model';

export const createDbQuery = (params: RequestParamsType) => `SELECT "${params.id}"`;
