import { c, s } from '_/val.config';
import { themeSchema } from '@/content/schema/theme.val';

export const schema = s.object({
  theme: themeSchema,
  metadataTitle: s.string(),
  metadataDescription: s.string(),
  title: s.string(),
  description: s.string()
});

export default c.define('/index', schema, {
  theme: `dark`,
  metadataTitle: `Meta Template Title`,
  metadataDescription: `Meta Template Description.`,
  title: `Template Header.`,
  description: `Template Description.`
});
