import 'server-only';
import { config } from '_/val.config';
import { draftMode } from 'next/headers';
import { initValServer } from '@valbuild/next/server';

const { valNextAppRouter } = initValServer(
  { ...config },
  {
    draftMode
  }
);

export { valNextAppRouter };
