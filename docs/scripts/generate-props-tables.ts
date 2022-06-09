import fs from 'fs';
import path from 'path';
import { globbyStream } from 'globby';
import { getCatalog } from './util/getCatalog';
import type {
  Catalog,
  Category,
  ComponentName,
  Properties,
} from './types/catalog';

const catalog = getCatalog();

// console.log(' 🐻 catalog: ', JSON.stringify(getCatalog(), null, 2));

createAllPropsTables();

async function createAllPropsTables() {
  for await (const componentFilepath of globbyStream(
    path.join(
      __dirname,
      '../../docs/src/pages/[platform]/components/*/index.page.mdx'
    )
  )) {
    const regex =
      /src\/pages\/\[platform\]\/components\/(\w*)\/index\.page\.mdx/;
    const componentPageName = (componentFilepath as string).match(
      regex
    )[1] as Lowercase<ComponentName>;
    const properties = getCatalogComponentProperties(
      catalog,
      componentPageName
    )?.properties;
    const res = getPropsSortedByCategory(properties, componentPageName);
    console.log(' sortPropsByCategory: ', res);
    console.log(`✅ ${componentPageName} Props Tables are updated.`);
  }
}

type PropsTable = {
  headers: ['Name', 'Type', 'Description'];
  rows: string[];
};
type PropsTables = PropsTable[];
type SortedPropertiesByCategory = { [key in Category]: Properties }[];
function createPropsTables(properties: Properties): PropsTables {}

function createPropsTable(properties: Properties): PropsTable {}

function getPropsSortedByCategory(
  properties: Properties,
  componentPageName: Lowercase<ComponentName>
): SortedPropertiesByCategory {
  if (properties) {
    let propertiesByCategory: Record<Category, Properties> = {} as Record<
      Category,
      Properties
    >;

    for (const propertyName in getCatalogComponentProperties(
      catalog,
      componentPageName
    ).properties) {
      const property = getCatalogComponentProperties(catalog, componentPageName)
        .properties[propertyName];
      propertiesByCategory = {
        ...propertiesByCategory,
        [property.category]: {
          ...propertiesByCategory[property.category],
          [propertyName]: property,
        },
      };
    }

    return Object.keys(propertiesByCategory)
      .sort((a, b) => a.localeCompare(b))
      .map(
        (category) =>
          ({ [category]: propertiesByCategory[category] } as {
            [key in Category]: Properties;
          })
      );
  } else {
    console.log(` 🫥  ${componentPageName} doesn't have any type properties.`);
  }
}

function getCatalogComponentProperties(
  object: Catalog,
  key: Lowercase<ComponentName>
): { properties: Properties } {
  const asLowercase = key.toLowerCase();
  return object[
    Object.keys(object).find((k) => k.toLowerCase() === asLowercase)
  ];
}
