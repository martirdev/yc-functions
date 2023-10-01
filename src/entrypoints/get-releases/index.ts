import {Handler} from '@yandex-cloud/function-types';

import {OWNER} from '_consts/github';
import {octokit} from '_utils/github';

import {RequestParams} from './model';

const LIMIT_PER_PAGE = 20;

export const handler: Handler.Http = async function (_e, context) {
  const data = context.getPayload();
  const request = RequestParams.parse(data);

  const listOfReleases = await octokit.request('GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs', {
    owner: OWNER,
    repo: request.repo,
    workflow_id: 'deploy-to-yc.yml',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    per_page: LIMIT_PER_PAGE,
    page: request.page ?? 1
  });

  return {
    statusCode: 200,
    body: JSON.stringify(listOfReleases.data.workflow_runs)
  };
};
