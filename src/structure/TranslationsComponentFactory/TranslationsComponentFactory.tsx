import * as React from 'react';
import styles from './TranslationsComponentFactory.scss';
import { IDefaultDocumentNodeStructureProps } from '../IDefaultDocumentNodeStructureProps';
import { ILanguageObject, Ti18nSchema } from '../../types';
import { getLanguagesFromOption, getBaseLanguage, getSanityClient, getConfig, getBaseIdFromId, getLanguageFromId } from '../../utils';
import { TranslationLink } from '../TranslationLink';

export const TranslationsComponentFactory = (schema: Ti18nSchema) => (props: IDefaultDocumentNodeStructureProps) => {
  const config = getConfig(schema);
  const [pending, setPending] = React.useState(false);
  const [languages, setLanguages] = React.useState<ILanguageObject[]>([]);
  const [baseDocument, setBaseDocument] = React.useState(null);
  const [baseLanguage, setBaseLanguage] = React.useState(null);

  React.useEffect(
    () => {
      (async () => {
        setPending(true);
        const doc = await getSanityClient().fetch('*[_id == $id]', { id: getBaseIdFromId(props.documentId) });
        const langs = await getLanguagesFromOption(config.languages, doc);
        const baseLang = getBaseLanguage(languages, typeof config.base === 'function' ? config.base(doc) : config.base);
        if (doc && doc.length > 0) setBaseDocument(doc[0]);
        setLanguages(langs);
        setBaseLanguage(baseLang);
        setPending(false);
      })();
    },
    []
  );

  if (pending) {
    return (
      <div className={styles.loading}>
        {config.messages?.loading}
      </div>
    );
  }

  const docId = getBaseIdFromId(props.documentId);
  const currentLanguage = getLanguageFromId(props.documentId) || (baseLanguage ? baseLanguage.name : null);
  return languages.map((lang, index) => (
    <TranslationLink
      key={lang.name}
      docId={docId}
      index={index}
      schema={schema}
      lang={lang}
      currentLanguage={currentLanguage}
      baseDocument={baseDocument}
    />
  ));
}