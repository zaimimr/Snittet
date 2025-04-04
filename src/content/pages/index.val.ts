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
  metadataDescription:
    'Regn ut snittet ditt fra universitet eller høyskole. Fungerer for NTNU, UiO, UiB, NMBU, UiT, OsloMet, USN, UiA, Nord universitet, Høgskulen på Vestlandet og flere. Enkel og nøyaktig snittkalkulator.',
  title: 'Norges beste snittkalkulator 🎉',
  description:
    'Regn ut snittet ditt fra alle universiteter og høyskoler i Norge. Rask og enkel kalkulator, for din beleilighet.'
});
