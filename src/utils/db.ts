import {flatten} from 'lodash-es';
import ydb from 'ydb-sdk';

const {Driver, getCredentialsFromEnv, getLogger} = ydb;

const makeDriver = () => {
  const endpoint = process.env.DB_ENDPOINT;
  const database = process.env.DB_DATABASE;
  const authService = getCredentialsFromEnv();
  return new Driver({endpoint, database, authService});
};

type RequestType = {
  request: string;
  params?: Record<string, ydb.Ydb.ITypedValue>;
};

type RequestFunction = (session: ydb.Session) => Promise<ydb.Ydb.IResultSet[][]>;

export async function requestFromDB(data: string | RequestType | RequestType[] | RequestFunction) {
  const logger = getLogger({level: 'debug'});
  const driver = makeDriver();

  if (!(await driver.ready(10000))) {
    const message = 'Driver has not become ready in 10 seconds!';
    logger.fatal(message);
    throw new Error(message);
  }

  const dbResponse = await driver.tableClient.withSession(async session => {
    if (typeof data === 'function') {
      return data(session);
    }

    const requests = Array.isArray(data) ? data : typeof data === 'string' ? [{request: data}] : [data];

    const results = await Promise.all(
      requests.map(async ({request, params}) => {
        const preparedQuery = await session.prepareQuery(request);
        const data = await session.executeQuery(preparedQuery, params);
        return data.resultSets;
      })
    );
    return results;
  });

  driver.destroy();
  return flatten(dbResponse);
}
