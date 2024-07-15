import React from 'react';

import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

import { ACTION_MENU_BLOCK_NAME } from './constants';

const { Icon } = StorageBrowserElements;

const iconAttributes = {
  'aria-hidden': true,
  className: `${ACTION_MENU_BLOCK_NAME}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const uploadFileIconProps = () => ({
  children: (
    <path
      d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
      fill="currentColor"
    ></path>
  ),
  ...iconAttributes,
});

const uploadFolderIconProps = () => ({
  children: (
    <path
      d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
      fill="currentColor"
    ></path>
  ),
  ...iconAttributes,
});

const toggleIconProps = () => ({
  children: (
    <path
      d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
      fill="currentColor"
    ></path>
  ),
  ...iconAttributes,
});

export const ToggleIcon = withBaseElementProps(Icon, toggleIconProps);
export const UploadFileIcon = withBaseElementProps(Icon, uploadFileIconProps);
export const UploadFolderIcon = withBaseElementProps(
  Icon,
  uploadFolderIconProps
);
