import {Octokit} from '@octokit/core';
import fetch from 'node-fetch';

// Для работы с octokit при создании функции всегда передаем ключ GITHUB_API_KEY
export const octokit = new Octokit({
  request: {fetch},
  auth: process.env.GITHUB_API_KEY
});

const TAG_REGEX = /v([0-9]+)/gm;

export const makeTag = (tag: string) => {
  const [_r1, version] = TAG_REGEX.exec(tag) as unknown as [unknown, string];

  const numberedVersion = Number(version);
  const create = (version: number) => `v${version}`;

  return {
    increase: () => makeTag(create(numberedVersion + 1)),
    decrease: () => makeTag(create(numberedVersion - 1)),
    create: () => create(numberedVersion),
    version
  };
};
