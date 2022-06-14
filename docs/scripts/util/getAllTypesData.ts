import fs from 'fs';
import path from 'path';
import { Project, PropertySignature, TypeAliasDeclaration } from 'ts-morph';
import { capitalizeString } from '../../src/utils/capitalizeString';
import {
  AllTypeFileData,
  TypeFileData,
  TypeFileName,
} from '../types/allTypesData';
import { SyntaxKind } from 'typescript';
import { sanitize } from './sanitize';

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

  const allTypeFilesData: AllTypeFileData = new Map();

  const allTypeFiles = source.getReferencedSourceFiles();
  const names = [];
  allTypeFiles.forEach((typeFile) => {
    const typeFileName: TypeFileName = capitalizeString(
      typeFile.getBaseName().slice(0, typeFile.getBaseName().indexOf('.ts'))
    ) as TypeFileName;
    names.push(typeFileName);
    const typeFileData: TypeFileData = new Map();

    typeFile.getInterfaces().forEach((typeInterface) => {
      typeInterface.getProperties().forEach((typeProperty) => {
        setTypeData(typeProperty, typeFileName, typeFileData);
      });
    });

    allTypeFilesData.set(typeFileName, typeFileData);

    fs.writeFileSync(typeFile.getFilePath(), typeFile.getFullText());
  });

  return allTypeFilesData;
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
  type TypeData = Map<string, string | boolean | { description: string }>;
  const typeData: TypeData = new Map();
  const typeJsDocs = typeProp.getJsDocs();
  const typeDescription = typeJsDocs[0]?.getTags().reduce(
    (descriptions, tag) => ({
      ...descriptions,
      [tag.getTagName()]: sanitize(tag.getText()),
    }),
    {}
  ) as { description: string };
  const typeName = typeProp.getNameNode().getText();
  const typeType = typeProp.getTypeNode().getText();
  const isOptional =
    typeProp.getChildrenOfKind(SyntaxKind.QuestionToken)[0]?.getText() === '?';

  typeData.set('name', sanitize(typeName));
  typeData.set('type', typeType);
  typeData.set('description', typeDescription);
  typeData.set('isOptional', isOptional);
  typeData.set('category', typeFileName);
  typeFileData.set(typeName, typeData);
}
