import 'server-only';
import { config } from '_/val.config';
import { cookies, draftMode, headers } from 'next/headers';
import { initValRsc } from '@valbuild/next/rsc';

const { fetchValStega: fetchVal } = initValRsc(config, {
  draftMode,
  headers,
  cookies
});

export { fetchVal };
