# Installation
1. Install the plugin using `npm`, `yarn` or the sanity cli
`yarn add sanity-plugin-intl-input`
`sanity install intl-input`
2. Add the plugin in the `sanity.json` of your project
```
{
  "root": true,
  "project": {
    "name": "..."
  },
  "plugins": [
    "...",
    "intl-input" // <--
  ]
}
```
3. The plugin has a custom desk structure to hide translated documents from the main view. You need to manually implement this as follows
Add the part in `sanity.json`
```
{
  ...
  "parts": [
    ...
    {
      "name": "part:@sanity/desk-tool/structure",
      "path": "./deskStructure.js"
    }
  ]
  ...
}
```

Implement the structure by creating a file called `deskStructure.js` in the root of your Sanity project and adding the code below (either default implementation or manual implementation). If you want to read more about the structure builder, please refer to the [Sanity documentation](https://www.sanity.io/guides/getting-started-with-structure-builder)
```javascript
import * as Structure from 'sanity-plugin-intl-input/lib/structure';

// default implementation by re-exporting
export const getDefaultDocumentNode = Structure.getDefaultDocumentNode;
export default Structure.default;

// or manual implementation to use with your own custom desk structure
export const getDefaultDocumentNode = (props) => {
    if (props.schemaType === 'myschema') {
        return S.document().views(Structure.getDocumentNodeViewsForSchemaType(props.schemaType));
    }
    return S.document();
};

export default () => {
  const items = Structure.getFilteredDocumentTypeListItems();
  return S.list()
      .id('__root__')
      .title('Content')
      .items(items);
};
```

4. Add the configuration file in your studio's config folder. It should be called `intl-input.json` and needs to be an empty object `{}` (or you can copy the default one if it was not automatically added).

5. Now would be a good time to decide on which ID structure you want to use and which reference behavior you want to apply. Information regarding these options can be found on the [Important configuration page](./important-configuration.md)

Additional configuration options can be found on the [configuration page](./general-configuration.md)