import { ILanguageQuery } from './ILanguageQuery';
import { ILanguageObject } from './ILanguageObject';

export type TLanguagesOption = (string | ILanguageObject)[] | ILanguageQuery | ((lang: any) => string[]);