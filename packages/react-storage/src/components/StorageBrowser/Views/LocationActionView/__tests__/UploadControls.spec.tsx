import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import * as ControlsModule from '../../../context/controls';
import createProvider from '../../../createProvider';
import { ActionSelectState } from '../../../context/controls/ActionSelect/ActionSelect';

import { UploadControls, ActionIcon, ICON_CLASS } from '../UploadControls';

const TEST_ACTIONS = {
  UPLOAD_FILES: { displayName: 'Upload Files', handler: jest.fn() },
};

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const actionSelectState: ActionSelectState = {
  actions: TEST_ACTIONS,
  selected: {
    items: [],
    type: 'UPLOAD_FILES',
  },
};

const navigateState = {
  location: {
    permission: 'READWRITE',
    scope: 's3://test-bucket/*',
    type: 'BUCKET',
  },
  path: 'path',
  history: [
    { prefix: '', position: 0 },
    { prefix: 'folder1/', position: 1 },
    { prefix: 'folder2/', position: 2 },
    { prefix: 'folder3/', position: 3 },
  ],
};

useControlSpy.mockImplementation(({ type }) => {
  if (type === 'ACTION_SELECT') {
    return [actionSelectState, jest.fn()];
  }

  if (type === 'NAVIGATE') {
    return [navigateState];
  }
});

const config = {
  getLocationCredentials: jest.fn(),
  listLocations: jest.fn(),
  region: 'region',
  registerAuthListener: jest.fn(),
};
const Provider = createProvider({ actions: TEST_ACTIONS, config });

describe('UploadControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render upload controls table', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <UploadControls />
        </Provider>
      );
    });

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should render the destination folder', async () => {
    await waitFor(() => {
      render(
        <Provider>
          <UploadControls />
        </Provider>
      );
    });

    const destination = screen.getByText('Destination:');
    const destinationFolder = screen.getByText('folder3/');

    expect(destination).toBeInTheDocument();
    expect(destinationFolder).toBeInTheDocument();
  });
});

describe('ActionIcon', () => {
  it('should show all icon statuses', () => {
    const { container } = render(
      <>
        <ActionIcon />
        <ActionIcon status="CANCELED" />
        <ActionIcon status="COMPLETE" />
        <ActionIcon status="QUEUED" />
        <ActionIcon status="FAILED" />
        <ActionIcon status="PENDING" />
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
