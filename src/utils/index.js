import { SUPPORTED_LANGUAGES } from './constants';

export const isSupportedLanguage = language =>
  SUPPORTED_LANGUAGES.indexOf(language) > -1;

export const isFloat = val => {
  var floatRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
  if (!floatRegex.test(val)) return false;

  val = parseFloat(val);
  if (isNaN(val)) return false;
  return true;
};

export const numberWithCommas = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeComma = str => str.replace(/,/g, '');

export const getLanguage = () => {
  let language = navigator.language.split(/[-_]/)[0]; // language without region code
  return isSupportedLanguage(language) ? language : 'en';
};
