import { defaultFont } from 'src/theme/core/typography';

import type { SettingsState } from './types';

// ----------------------------------------------------------------------

export const STORAGE_KEY = 'app-settings';

export const defaultSettings: SettingsState = {
  colorScheme: 'dark',
  direction: 'ltr',
  contrast: 'default',
  navLayout: 'horizontal',
  primaryColor: 'default',
  navColor: 'integrate',
  compactLayout: false,
  fontFamily: defaultFont,
} as const;