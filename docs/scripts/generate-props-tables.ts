import fs from 'fs';
import path from 'path';
import { globbyStream } from 'globby';
import { getCatalog, sharedCategories } from './util/getCatalog';
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
    const properties = getObjectValueWithCaselessKey(
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

function createPropsTable(properties: SortedPropertiesByCategory): PropsTable {}

type PropertiesByCategory = Record<Category, Properties>;

function getPropsSortedByCategory(
  properties: Properties,
  componentPageName: Lowercase<ComponentName>
): SortedPropertiesByCategory {
  if (properties) {
    let propertiesByCategory: PropertiesByCategory = {} as PropertiesByCategory;

    for (const propertyName in getObjectValueWithCaselessKey(
      catalog,
      componentPageName
    ).properties) {
      const property = getObjectValueWithCaselessKey(catalog, componentPageName)
        .properties[propertyName];
      propertiesByCategory = {
        ...propertiesByCategory,
        [property.category]: {
          ...propertiesByCategory[property.category],
          [propertyName]: property,
        },
      };
    }

    const componentName =
      Object.keys(propertiesByCategory).find(
        (category) => category.toLowerCase() === componentPageName
      ) ?? (componentPageName as ComponentName | Lowercase<ComponentName>);

    const allCategories = [
      componentName,
      ...Object.keys(propertiesByCategory)
        .filter(
          (category) =>
            ![componentPageName, 'Other'].includes(category.toLowerCase())
        )
        .sort((a, b) => a.localeCompare(b)),
      'Other',
    ] as (Category | 'Other')[];

    return allCategories
      .map(
        (category) =>
          ({
            [category]: getObjectValueWithCaselessKey(
              propertiesByCategory,
              category
            ),
          } as {
            [key in Category]: Properties;
          })
      )
      .filter((val) => Object.values(val)[0]);
  } else {
    console.log(` 🫥  ${componentPageName} doesn't have any type properties.`);
  }
}

/**
 *
 * @name getProperties
 * @description case-insensitively get the values from an object
 */
function getObjectValueWithCaselessKey(
  object: PropertiesByCategory,
  key:
    | ComponentName
    | Lowercase<ComponentName>
    | Category
    | Lowercase<Category>
    | 'Other'
): Properties;
function getObjectValueWithCaselessKey(
  object: Catalog,
  key:
    | ComponentName
    | Lowercase<ComponentName>
    | Category
    | Lowercase<Category>
    | 'Other'
): {
  properties: Properties;
};
function getObjectValueWithCaselessKey(object, key) {
  const asLowercase = key.toLowerCase();
  return object[
    Object.keys(object).find((k) => k.toLowerCase() === asLowercase)
  ];
}
