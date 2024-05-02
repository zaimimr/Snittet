import { c, s } from '_/val.config';
import { themeSchema } from '@/content/schema/theme.val';

export const schema = s.object({
  theme: themeSchema,
  metadataTitle: s.string(),
  metadataDescription: s.string(),
  title: s.string(),
  description: s.string()
});

export default c.define('/src/content/pages/index', schema, {
  theme: `light`,
  metadataTitle: `Snittkalkulator`,
  metadataDescription: `En snittkalkulator for høyere utdanning, universiteter og høyskoler som henter emne data automatisk fra DBH for å gjøre det enklere for studenter å regne ut snittet sitt.`,
  title: `Snittkalkulator for Universiteter og Høyskoler`,
  description: `En snittkalkulator for høyere utdanning, universiteter og høyskoler som henter emne data automatisk fra DBH for å gjøre det enklere for studenter å regne ut snittet sitt.`
});
