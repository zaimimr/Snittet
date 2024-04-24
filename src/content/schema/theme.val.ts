import { s } from '_/val.config';

export const themeSchema = s.union(s.literal('light'), s.literal('dark'));
