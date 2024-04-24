import 'client-only';
import { config } from '_/val.config';
import { initValClient } from '@valbuild/next/client';

const { useValStega: useVal } = initValClient(config);

export { useVal };
