import { initVal } from '@valbuild/next';

const { s, c, val, config } = initVal({
  remote: 'zaim/template',
  root: '.',
  gitBranch: process.env.VERCEL_GIT_COMMIT_REF,
  gitCommit: process.env.VERCEL_GIT_COMMIT_SHA
});

export type { t } from '@valbuild/next';
export { s, c, val, config };
