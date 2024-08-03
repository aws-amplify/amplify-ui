import React from 'react';
import { ViewComponent } from '../types';
import { CreateFolderActionViewControls } from './Controls';
import { StorageBrowserElements } from '../../context/elements';

export interface CreateFolderActionView<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends ViewComponent<CreateFolderActionViewControls<T>> {}

// @ts-expect-error TODO: add Controls assignment
export const CreateFolderActionView: CreateFolderActionView = () => {
  return <CreateFolderActionViewControls />;
};
