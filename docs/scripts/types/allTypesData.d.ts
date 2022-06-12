import { Category } from './catalog';

export type TypeFileData = Map<string, Map<string, string | boolean | object>>;
export type AllTypeFileData = Map<Category | Category, TypeFileData>;
