import * as React from 'react';
import { FcRefresh } from 'react-icons/fc';
import { StorageBrowser } from './StorageBrowser';
import { IconsProvider } from '@aws-amplify/ui-react';

export default function Example() {
  return (
    <IconsProvider
      icons={{
        storageBrowser: {
          refresh: <FcRefresh />,
          excel: <UserCustomExcelIcon />,
          pdf: <UserCustomPDFIcon />,
          text: <UserCustomTextIcon />,
        },
      }}
    >
      <StorageBrowser />
    </IconsProvider>
  );
}
