export enum PrimitiveCatalogComponentPropertyType {
  Boolean = 'boolean',
  String = 'string',
  Number = 'number',
  Any = 'any',
}

export type PrimitiveCatalogComponentProperty = {
  type: PrimitiveCatalogComponentPropertyType;
};

export type PrimitiveCatalogComponentProperties = Record<
  string,
  PrimitiveCatalogComponentProperty
>;

export type PrimitiveCatalogComponent = {
  properties: PrimitiveCatalogComponentProperties;
};

export type PrimitiveCatalog = Record<string, PrimitiveCatalogComponent>;
