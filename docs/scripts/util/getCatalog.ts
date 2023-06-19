import path from 'path';
import { Node, Project, Symbol, Type, VariableDeclaration } from 'ts-morph';

import { getAllTypesData } from './getAllTypesData';
import { capitalizeString } from '../../src/utils/capitalizeString';
import {
  ComponentName,
  Category,
  Property,
  Properties,
  Catalog,
} from '../types/catalog';
import { TypeFileName } from '../types/allTypesData';

const { allTypeFilesInterfaceData, allTypeFilesTypeData } = getAllTypesData();

const project = new Project({
  tsConfigFilePath: path.resolve(
    __dirname,
    '../../../packages/react/tsconfig.json'
  ),
});

const source = project.getSourceFile(
  path.resolve(
    __dirname,
    '../../../packages/react/src/primitives/components.ts'
  )
);

/**
 * @description getCatalog function get props information for all components.
 * @returns catalog data object
 *  {
      componentName: {
        prop: {
          "name": string,
          "type": string,
          "description": "",
          "category": string,
        },
        ...
      }
      ...
    }
 */
function getCatalog() {
  const catalog: Catalog = {} as Catalog;
  for (const [componentName, [node]] of source.getExportedDeclarations()) {
    let properties: Properties = {};
    if (isPrimitive(node)) {
      const [propsType] = node.getType().getTypeArguments();
      properties = getComponentProperties(
        propsType,
        componentName as ComponentName
      );
    } else if (isCallableNode(node)) {
      const [signature] = node.getType().getCallSignatures();

      if (signature && signature.getParameters().length) {
        properties = getComponentProperties(
          signature.getParameters()[0].getValueDeclaration().getType(),
          componentName as ComponentName
        );
      }
    }

    // Skip primitives without properties
    if (Object.keys(properties).length) {
      catalog[componentName as ComponentName] = { ...properties };
    } else {
      console.log(`Skip ${componentName} since it's without properties.`);
    }
  }

  return catalog;
}

/**
 * @name isPrimitive
 * @description Determine if a TypeScript AST Node is a React component
 */
function isPrimitive(node: Node): node is VariableDeclaration {
  const typeName = node.getType().getText(node);
  return (
    Node.isVariableDeclaration(node) &&
    (typeName.startsWith('Primitive') ||
      typeName.startsWith('ForwardRefPrimitive'))
  );
}

/**
 * @name getComponentProperties
 * @description get all the properties for a component
 */
function getComponentProperties(
  type: Type,
  componentName: ComponentName
): Properties;
function getComponentProperties(type: Type, componentName: ComponentName) {
  const properties: Properties = {};

  type.getProperties().forEach((prop) => {
    const propName = prop.getName();

    const property = getCatalogComponentProperty(prop, componentName);

    if (property) {
      properties[propName] = property;
    }
  });

  return properties;
}

/**
 * @name getCatalogComponentProperty
 * @description Get a catalog-compatible component property definition
 */
function getCatalogComponentProperty(
  property: Symbol,
  componentName: ComponentName
): Property {
  const name = property.getName();
  const propDeclaration = property.getDeclarations()[0];
  const propType = propDeclaration.getType();
  const description = property
    .getJsDocTags()
    .map((tag) => {
      const name = tag?.getName();
      const text = tag?.getText().map((el) => el.text);
      return `${
        ['description', 'deprecated'].includes(name)
          ? ''
          : `${capitalizeString(name)}: `
      }${text}`;
    })
    .join(' ');

  //@ts-ignore
  const category = propDeclaration.getAncestors()[0]?.getName
    ? //@ts-ignore
      propDeclaration.getAncestors()[0].getName()
    : (capitalizeString(getCategory(name, componentName)) as Category);

  const type =
    (allTypeFilesInterfaceData
      .get(category as TypeFileName)
      ?.get(name)
      ?.get('type') as string) ?? propType.getText(); // use type from allTypeFilesInterfaceData because it has a better-looking format

  return {
    name,
    type: overwriteType(type, name, componentName),
    description,
    category,
    isOptional: property.isOptional(),
  };
}

function overwriteType(type, name, componentName) {
  const regex = /import\(\"\/[\w/-_-]+"\)\./g;

  if (name === 'ref' && type === 'React.Ref<T>') {
    type = 'React.Ref<HTMLElement>';
  } else if (name === 'as' && type === 'Element | Props["as"]') {
    type = 'Element';
  } else if (type.includes('import')) {
    [...type.matchAll(regex)].forEach((match) => {
      type = type.replace(match, '');
    });
  }

  const definedInTypeFile = [
    ...(allTypeFilesTypeData.get(componentName)?.values() || []),
    ...(allTypeFilesTypeData.get('Base')?.values() || []),
    ...(allTypeFilesTypeData.get('Field')?.values() || []),
    ...(allTypeFilesTypeData.get('Text')?.values() || []),
    ...(allTypeFilesTypeData.get('Button')?.values() || []),
  ].find((val) => {
    return (
      val &&
      type?.toLowerCase().includes(val.get('name').toString().toLowerCase())
    );
  });

  if (definedInTypeFile) {
    type = definedInTypeFile.get('type');
  }

  return type;
}

function isCallableNode(node: Node): node is VariableDeclaration {
  return node.getType().getCallSignatures().length > 0;
}

/**
 * @name getCategory
 * @description categorize properties by checking if they belong to a certain property group.
 */
function getCategory(propName: string, componentName: ComponentName): Category {
  const preSetCategories = { as: 'Base', ref: 'Base' };
  return preSetCategories[propName] ?? 'other';
}

export { getCatalog };
