import { config } from '_/val.config';
import { ValApp } from '@valbuild/next';

export default function Val() {
  return <ValApp config={config} />;
}
