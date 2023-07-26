import {Driver, TypedData, Ydb, getCredentialsFromEnv, getLogger, identityConversion} from 'ydb-sdk';

const makeDriver = () => {
  const endpoint = process.env.DB_ENDPOINT;
  const database = process.env.DB_DATABASE;
  const authService = getCredentialsFromEnv();
  return new Driver({endpoint, database, authService});
};

const convertDBSet = (value: Ydb.IResultSet) => {
  const TD = TypedData;
  TD.__options.namesConversion = identityConversion;

  return TD.createNativeObjects(value);
};

export const requestFromDB = async (request: string) => {
  const logger = getLogger({level: 'debug'});
  const driver = makeDriver();

  if (!(await driver.ready(10000))) {
    const message = 'Driver has not become ready in 10 seconds!';
    logger.fatal(message);
    throw new Error(message);
  }

  const dbResponse = await driver.tableClient.withSession(async session => {
    const preparedQuery = await session.prepareQuery(request);
    const {resultSets} = await session.executeQuery(preparedQuery);

    return resultSets.map(convertDBSet);
  });
  driver.destroy();
  return dbResponse;
};
