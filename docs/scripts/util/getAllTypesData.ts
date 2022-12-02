import fs from 'fs';
import path from 'path';
import { Project, PropertySignature, TypeAliasDeclaration } from 'ts-morph';
import { capitalizeString } from '../../src/utils/capitalizeString';
import {
  AllTypeFileData,
  TypeFileData,
  TypeFileName,
  TypeData,
} from '../types/allTypesData';
import { SyntaxKind } from 'typescript';

export const getAllTypesData = () => {
  const project = new Project({
    tsConfigFilePath: path.resolve(
      __dirname,
      '../../../packages/react/tsconfig.json'
    ),
  });

  const source = project.getSourceFile(
    path.resolve(
      __dirname,
      '../../../packages/react/src/primitives/types/index.ts'
    )
  );

  const allTypeFilesInterfaceData: AllTypeFileData = new Map();
  const allTypeFilesTypeData: AllTypeFileData = new Map();

  const allTypeFiles = source.getReferencedSourceFiles();

  allTypeFiles.forEach((typeFile) => {
    const typeFileName: TypeFileName = capitalizeString(
      typeFile.getBaseName().slice(0, typeFile.getBaseName().indexOf('.ts'))
    ) as TypeFileName;

    const typeFileInterfaceData: TypeFileData = new Map();
    const typeFileTypeData: TypeFileData = new Map();
    const typeAliases = typeFile.getTypeAliases();
    if (typeAliases) {
      typeAliases.forEach((typeAlias) => {
        setTypeData(typeAlias, typeFileName, typeFileTypeData);
      });
    }

    typeFile.getInterfaces().forEach((typeInterface) => {
      typeInterface.getProperties().forEach((typeProperty) => {
        setTypeData(typeProperty, typeFileName, typeFileInterfaceData);
      });

      if (
        !typeInterface.getProperties().length &&
        typeInterface.getHeritageClauses().length
      ) {
        const typeData: TypeData = new Map();
        const heritageName = typeInterface.getName();
        const heritageType = typeInterface
          .getHeritageClauses()
          .map((clause) => clause.getText())
          .join('\n   ');
        const heritageDescription = typeInterface.getJsDocs().length
          ? typeInterface.getJsDocs()[0].getText()
          : '';

        typeData.set('name', heritageName);
        typeData.set('type', heritageType);
        typeData.set('description', heritageDescription);
        typeData.set('isOptional', true);
        typeData.set('category', typeFileName);
        typeFileInterfaceData.set(heritageName, typeData);
      }
    });

    allTypeFilesInterfaceData.set(typeFileName, typeFileInterfaceData);
    allTypeFilesTypeData.set(typeFileName, typeFileTypeData);

    fs.writeFileSync(typeFile.getFilePath(), typeFile.getFullText());
  });

  return { allTypeFilesInterfaceData, allTypeFilesTypeData };
};

/**
 * @name setTypeData
 * @description set property information for TypeAlias and Interfaces to typeFileData.
 */
function setTypeData(
  typeProp: TypeAliasDeclaration | PropertySignature,
  typeFileName: TypeFileName,
  typeFileData: TypeFileData
) {
  const typeData: TypeData = new Map();
  const typeJsDocs = typeProp.getJsDocs();

  const typeDescription = typeJsDocs[0]?.getTags().reduce(
    (descriptions, tag) => ({
      ...descriptions,
      [tag.getTagName()]: tag
        .getText()
        .replace(`@${tag.getTagName()}\n`, '')
        .replaceAll('*', '')
        .trim(),
    }),
    {}
  ) as { description: string };

  const typeName = typeProp.getNameNode().getText();
  const typeType = typeProp.getTypeNode().getText();
  const isOptional =
    typeProp.getChildrenOfKind(SyntaxKind.QuestionToken)[0]?.getText() === '?';

  typeData.set('name', typeName);
  typeData.set('type', typeType);
  typeData.set('description', typeDescription);
  typeData.set('isOptional', isOptional);
  typeData.set('category', typeFileName);
  typeFileData.set(typeName, typeData);
}
