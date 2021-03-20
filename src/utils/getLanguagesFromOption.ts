import get from 'lodash.get';
import { TLanguagesOption } from '../types';
import { normalizeLanguageList } from './normalizeLanguageList';
import { getSanityClient } from './getSanityClient';

export const getLanguagesFromOption = async (langs: TLanguagesOption, doc) => {
  return normalizeLanguageList(await (async () => {
    if (Array.isArray(langs)) return langs;
    else if (typeof langs === 'function') return langs(doc);
    const r = await getSanityClient().fetch(langs.query);
    const value = langs.value;

    if (typeof value === 'string') return r.map(l => get(l, value));
    return r.map(l => ({
      name: get(l, value.name),
      title: get(l, value.title),
    }));
  })());
}