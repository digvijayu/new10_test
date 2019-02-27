import { SUPPORTED_LANGUAGES } from './constants';

export const isSupportedLanguage = language =>
  SUPPORTED_LANGUAGES.indexOf(language) > -1;
