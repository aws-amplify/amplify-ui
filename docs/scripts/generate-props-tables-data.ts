import fs from 'fs';
import path from 'path';
import { globbyStream } from 'globby';
import { getAllTypesData, getCatalog } from './util';
import type {
  Category,
  ComponentName,
  Properties,
  PropsTableSubComponentData,
  SortedPropertiesByCategory,
} from './types/catalog';
import { TypeFileName } from './types/allTypesData';
import { capitalizeString } from '@/utils/capitalizeString';

const catalog = getCatalog();
const { allTypeFilesInterfaceData } = getAllTypesData();

createAllPropsTablesData().then((allPropsTablesData) => {
  fs.writeFileSync(
    path.join(__dirname, '../../docs/src/data/', `./props-table.json`),
    JSON.stringify(Object.fromEntries(allPropsTablesData), null, 4)
  );
});

async function createAllPropsTablesData(): Promise<
  Map<string, PropsTableSubComponentData>
> {
  const data: Map<string, PropsTableSubComponentData> = new Map();
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
    const componentName = Object.keys(catalog).find(
      (categoryName) =>
        categoryName.toLowerCase() === componentPageName.toLowerCase()
    ) as ComponentName;
    const properties = catalog[componentName];
    const propsSortedByCategory = getPropsSortedByCategory(
      properties,
      componentName
    );
    data.set(componentName, {
      [componentName]: propsSortedByCategory,
    } as PropsTableSubComponentData);

    const componentsWithChildren: { [key in ComponentName]?: ComponentName[] } =
      {
        Expander: ['ExpanderItem'],
        Menu: ['MenuButton', 'MenuItem'],
        RadioGroupField: ['Radio'],
        Tabs: ['TabItem'],
        Table: ['TableBody', 'TableCell', 'TableFoot', 'TableHead', 'TableRow'],
        ToggleButton: ['ToggleButtonGroup'],
      };

    if (componentName in componentsWithChildren) {
      const subComponentProps = {};
      componentsWithChildren[componentName].forEach((childName) => {
        subComponentProps[childName] = getPropsSortedByCategory(
          properties,
          childName
        );
      });

      data.set(componentName, {
        ...data.get(componentName),
        ...subComponentProps,
      });
    }
  }
  return new Map([...data.entries()].sort(([a], [b]) => a.localeCompare(b)));
}

function getPropsSortedByCategory(
  properties: Properties,
  componentName: ComponentName
): SortedPropertiesByCategory {
  if (properties) {
    let propertiesByCategory: PropertiesByCategory =
      getPropertiesByCategory(componentName);

    const allTableCategories: {
      [key in 'Main' | 'Layout']: Category[];
    } = {
      Main: ['BaseComponentProps'],
      Layout: [
        'CSSLayoutStyleProps',
        'FlexContainerStyleProps',
        'FlexItemStyleProps',
        'GridContainerStyleProps',
        'GridItemStyleProps',
      ],
    };

    const isPropMainCategory = (category) => {
      const isCurrentComponentProp = category
        .toLowerCase()
        .includes(componentName.toLowerCase());
      const isPropsOrOptions = category.toLowerCase().match(/props|options/);
      const isSharedBasicCategory = Object.values(allTableCategories).find(
        (propArr) => propArr.includes(category)
      );
      const isBaseStyleProps = category === 'BaseStyleProps';
      const isAriaProps = category === 'AriaProps';

      return (
        isCurrentComponentProp ||
        (isPropsOrOptions &&
          !isSharedBasicCategory &&
          !isBaseStyleProps &&
          !isAriaProps)
      );
    };

    allTableCategories.Main = [
      ...allTableCategories.Main,
      ...Object.keys(propertiesByCategory).filter(isPropMainCategory),
    ] as Category[];

    return Object.keys(allTableCategories)
      .map((category) => {
        switch (category) {
          case 'Main':
            return {
              Main: combineCategories(
                propertiesByCategory,
                allTableCategories.Main
              ),
            };
          case 'Layout':
            return {
              Layout: combineCategories(
                propertiesByCategory,
                allTableCategories.Layout
              ),
            };
          case 'Styling':
            return {
              Styling: combineCategories(propertiesByCategory, [
                'BaseStyleProps',
              ]),
            };
          default:
            break;
        }
      })
      .filter((v) => Object.values(Object.values(v)[0])[0]);
  } else {
    throw new Error(` 🫥  ${componentName} doesn't have any type properties.`);
  }
}

type PropertiesByCategory = Record<Category, Properties>;
function getPropertiesByCategory(
  componentName: ComponentName
): PropertiesByCategory {
  let propertiesByCategory: PropertiesByCategory = {} as PropertiesByCategory;

  /**
   * Some special components don't have accurate properties generated from getCatalog, so we have to manually point it to AllTypesData as well in addition to the Catalog.
   * First element is the component's name
   */
  const specialComponents: { [key in string]: TypeFileName[] } = {
    View: ['View', 'Base', 'Style'],
    TextField: ['TextField', 'TextArea', 'Input', 'Field'],
  };

  for (const propertyName in catalog[componentName]) {
    const property = catalog[componentName][propertyName];
    propertiesByCategory = {
      ...propertiesByCategory,
      [property.category]: {
        ...propertiesByCategory[property.category],
        [propertyName]: property,
      },
    };
  }
  if (Object.keys(specialComponents).includes(componentName)) {
    propertiesByCategory = {
      ...propertiesByCategory,
      [componentName]: {
        ...propertiesByCategory[componentName],
        ...getPropertiesFromAllTypeData(specialComponents[componentName]),
      },
    };
  }
  return propertiesByCategory;
}

function getPropertiesFromAllTypeData(sourceTypes: TypeFileName[]) {
  let targetProps: Properties;

  sourceTypes.forEach((type) => {
    // as prop
    targetProps = {
      ...targetProps,
      as: {
        name: 'as',
        type: 'React.ElementType',
        description: 'Changes the underlying rendered HTML element',
        category: 'BaseComponentProps',
        isOptional: true,
      },
    };

    if (!allTypeFilesInterfaceData.get(type)) return;
    for (const [propName, property] of allTypeFilesInterfaceData
      .get(type)
      .entries()) {
      targetProps = {
        ...targetProps,
        [propName]: {
          name: String(property.get('name')),
          type: String(property.get('type')),
          description: property.get('description')
            ? Object.entries(property.get('description'))
                .map(
                  ([tag, tagText]) =>
                    `${
                      ['description', 'deprecated'].includes(tag)
                        ? ''
                        : `${capitalizeString(tag)}: `
                    }${tagText}`
                )
                .join(' ')
            : '',
          category: property.get('category') as Category,
          isOptional: property.get('isOptional') as boolean,
        },
      };
    }
  });
  return targetProps;
}

function combineCategories(propertiesByCategory, toBeCombined: Category[]) {
  return toBeCombined.reduce(
    (acc, category) => ({
      ...acc,
      ...propertiesByCategory[category],
    }),
    {}
  );
}
