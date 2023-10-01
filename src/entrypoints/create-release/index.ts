import {Handler} from '@yandex-cloud/function-types';

import {OWNER} from '_consts/github';
import {makeTag, octokit} from '_utils/github';

import {RequestParams} from './model';

export const handler: Handler.Http = async function (_event, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const latestRelease = await octokit.request('GET /repos/{owner}/{repo}/releases/latest', {
    owner: OWNER,
    repo: request.repo,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  const tagObject = makeTag(latestRelease.data.tag_name).increase();

  const release = await octokit.request('POST /repos/{owner}/{repo}/releases', {
    owner: OWNER,
    repo: request.repo,
    tag_name: tagObject.create(),
    name: `Release for web #${tagObject.version}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(release)
  };
};
