export interface FolderItem {
  key: string;
  type: 'FOLDER';
}

export type FolderName = `${string}/`;
export const isFolderName = (key: string): key is FolderName =>
  key.endsWith('/');

export interface FileItem {
  key: string;
  lastModified: Date;
  size: number;
  type: 'FILE';
}

export type LocationItem = FileItem | FolderItem;

export type Permission = 'READ' | 'READWRITE' | 'WRITE';
export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

export interface LocationData<T = Permission> {
  bucket: string;
  prefix: string | undefined;
  scope: string;
  permission: T;
  type: LocationType;
}

export type UploadItemData = Blob | ArrayBufferView | ArrayBuffer | string;
