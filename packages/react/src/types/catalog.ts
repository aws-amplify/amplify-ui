export type PrimitiveCatalogComponentPropertyType =
  | 'boolean'
  | 'string'
  | 'number';

export type PrimitiveCatalogComponentProperty = {
  type: PrimitiveCatalogComponentPropertyType;
  priority?: boolean;
};

export type PrimitiveCatalogComponentProperties = Record<
  string,
  PrimitiveCatalogComponentProperty
>;

export type PrimitiveCatalogComponent = {
  properties: PrimitiveCatalogComponentProperties;
};

export type PrimitiveCatalogType = Record<string, PrimitiveCatalogComponent>;
