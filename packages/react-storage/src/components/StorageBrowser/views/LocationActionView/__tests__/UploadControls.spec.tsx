import React from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import * as ControlsModule from '../../../context/control';
import createProvider from '../../../createProvider';
import { LocationActionsState } from '../../../context/locationActions';

import { UploadControls, ActionIcon, ICON_CLASS } from '../UploadControls';
import userEvent from '@testing-library/user-event';

const TEST_ACTIONS: LocationActionsState['actions'] = {
  UPLOAD_FILES: { options: { displayName: 'Upload Files' } },
};

const useControlSpy = jest.spyOn(ControlsModule, 'useControl');

const locationActionsState: LocationActionsState = {
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

useControlSpy.mockImplementation((type) => {
  if (type === 'LOCATION_ACTIONS') {
    return [locationActionsState, jest.fn()];
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

  it('opens the file picker when the add files button is clicked and uses the file selection dialog', async () => {
    const user = userEvent.setup();
    const files = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' }),
      new File(['content3'], 'file3.txt', {
        type: 'text/plain',
      }),
    ];

    render(
      <Provider>
        <UploadControls />
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'Add files' });
    const input: HTMLInputElement = screen.getByTestId('amplify-file-select');

    expect(input).toHaveAttribute('multiple');

    await act(async () => {
      await user.click(button);
      await user.upload(input, files);
    });

    expect(input.files).toHaveLength(3);
  });

  it('adds files dragged into the drop zone to the file list', async () => {
    const files = [new File(['content'], 'file.txt', { type: 'text/plain' })];

    render(
      <Provider>
        <UploadControls />
      </Provider>
    );

    const dropzone = screen.getByTestId('storage-browser-table');

    fireEvent.drop(dropzone, {
      dataTransfer: {
        files,
      },
    });

    await waitFor(() => {
      expect(screen.getByText('file.txt')).toBeInTheDocument();
    });
  });

  it('has the webkitdirectory attribute for the input select for folders', () => {
    render(
      <Provider>
        <UploadControls />
      </Provider>
    );

    const input: HTMLInputElement = screen.getByTestId('amplify-folder-select');

    expect(input).toHaveAttribute('webkitdirectory');
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
