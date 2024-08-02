import React from 'react';
import { ViewComponent } from '../types';
import { CreateFolderActionViewControls } from './Controls';

export interface CreateFolderActionView
  extends ViewComponent<CreateFolderActionViewControls> {}

// @ts-expect-error TODO: add Controls assignment
export const CreateFolderActionView: CreateFolderActionView = () => {
  return <CreateFolderActionViewControls />;
};
