import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ControlsModule from '../../../context/controls';
import createProvider from '../../../createProvider';
import { ActionSelectState } from '../../../context/controls/ActionSelect/ActionSelect';

import { UploadControls, ActionIcon, ICON_CLASS } from '../UploadControls';

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const actionSelectState: ActionSelectState = {
  actions: [],
  selected: {
    items: [],
    actionType: undefined,
    destination: undefined,
    name: undefined,
  },
};

const navigateState = {
  location: {
    permission: 'READWRITE',
    scope: 's3://test-bucket/*',
    type: 'BUCKET',
  },
  history: [
    { prefix: '', position: 0 },
    { prefix: 'folder1/', position: 1 },
    { prefix: 'folder2/', position: 2 },
    { prefix: 'folder3/', position: 3 },
  ],
};

useControlSpy.mockImplementation((obj) => {
  const { type } = obj;

  if (type === 'ACTION_SELECT') {
    return [actionSelectState, jest.fn()];
  }

  if (type === 'NAVIGATE') {
    return [navigateState];
  }
});

const listLocations = jest.fn(() =>
  Promise.resolve({ locations: [], nextToken: undefined })
);
const config = {
  getLocationCredentials: jest.fn(),
  listLocations,
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ config });

describe('UploadControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render upload controls table', async () => {
    actionSelectState.selected = {
      items: [
        {
          key: 'folder1/file1.png',
          lastModified: new Date(),
          size: 12345,
          type: 'FILE',
        },
      ],
      actionType: 'UPLOAD_FILES',
      destination: 's3://test-bucket/folder1/',
      name: 'Upload Files',
    };

    render(
      <Provider>
        <UploadControls />
      </Provider>
    );

    await waitFor(() => {
      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
    });
  });

  it('should render the destination folder', () => {
    render(
      <Provider>
        <UploadControls />
      </Provider>
    );

    const destination = screen.getByText('Destination:');
    const destinationFolder = screen.getByText('folder3/');

    expect(destination).toBeInTheDocument();
    expect(destinationFolder).toBeInTheDocument();
  });
});

describe('ActionItem', () => {
  it('should show all icon statuses', () => {
    const { container } = render(
      <>
        <ActionIcon />
        <ActionIcon status="CANCELED" />
        <ActionIcon status="SUCCESS" />
        <ActionIcon status="QUEUED" />
        <ActionIcon status="ERROR" />
        <ActionIcon status="IN_PROGRESS" />
      </>
    );
    const svg = container.querySelectorAll('svg');
    expect(svg[0]?.classList).toContain(`${ICON_CLASS}--action-initial`);
    expect(svg[1]?.classList).toContain(`${ICON_CLASS}--action-canceled`);
    expect(svg[2]?.classList).toContain(`${ICON_CLASS}--action-success`);
    expect(svg[3]?.classList).toContain(`${ICON_CLASS}--action-queued`);
    expect(svg[4]?.classList).toContain(`${ICON_CLASS}--action-error`);
    expect(svg[5]?.classList).toContain(`${ICON_CLASS}--action-progress`);
  });
});
