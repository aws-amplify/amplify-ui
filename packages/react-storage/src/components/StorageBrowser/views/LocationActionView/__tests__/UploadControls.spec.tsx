import React from 'react';
import { render } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import * as ConfigModule from '../../../providers/configuration';
import * as StoreModule from '../../../providers/store';
import * as TasksModule from '../../../tasks';

import { UploadControls, ActionIcon, ICON_CLASS } from '../UploadControls';

jest.mock('../Controls/Title');

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');
const useProcessTasksSpy = jest.spyOn(TasksModule, 'useProcessTasks');

const location = {
  id: 'an-id-👍🏼',
  bucket: 'test-bucket',
  permission: 'READWRITE',
  prefix: 'test-prefix/',
  type: 'PREFIX',
};
const dispatchStoreAction = jest.fn();
useStoreSpy.mockReturnValue([
  {
    history: { current: location, previous: [location] },
  } as StoreModule.UseStoreState,
  dispatchStoreAction,
]);

const credentials = jest.fn();
const config: ConfigModule.GetActionInput = jest.fn(() => ({
  credentials,
  bucket: location.bucket,
  region: 'region',
}));

const testFile = new File([], 'test-ooo');
const fileItem = { id: 'some-uuid', item: testFile, key: testFile.name };

jest.spyOn(ConfigModule, 'useGetActionInput').mockReturnValue(config);

describe('UploadControls', () => {
  let user: UserEvent;
  beforeEach(() => {
    user = userEvent.setup();
  });

  afterEach(jest.clearAllMocks);

  it('should render upload controls table', () => {
    const { getByRole } = render(<UploadControls />);

    const table = getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('should render the destination folder', () => {
    const { getByText } = render(<UploadControls />);

    const destination = getByText('Destination:');
    const destinationFolder = getByText('test-prefix/');

    expect(destination).toBeInTheDocument();
    expect(destinationFolder).toBeInTheDocument();
  });

  it('calls `useProcessTasks` with the expected values when provided a root `prefix`', async () => {
    const rootLocation = {
      id: 'an-id-👍🏼',
      bucket: 'test-bucket',
      permission: 'READWRITE',
      // a root `prefix` is an empty string
      prefix: '',
      type: 'BUCKET',
    };

    useStoreSpy.mockReturnValue([
      {
        history: { current: rootLocation, previous: [rootLocation] },
        files: [fileItem],
      } as StoreModule.UseStoreState,
      dispatchStoreAction,
    ]);

    const handleProcessTasks = jest.fn();
    useProcessTasksSpy.mockReturnValue([
      [
        {
          ...fileItem,
          cancel: undefined,
          message: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
      ],
      handleProcessTasks,
    ]);

    const { getByText, getAllByRole } = render(<UploadControls />);

    // render a '/' as the destination folder when prefix is an empty string
    const definitonEls = getAllByRole('definition');
    expect(definitonEls[0]).toHaveTextContent('/');

    const startButton = getByText('Start');
    expect(startButton).toBeInTheDocument();

    await user.click(startButton);

    expect(handleProcessTasks).toHaveBeenCalledTimes(1);
    expect(handleProcessTasks).toHaveBeenCalledWith({
      config: {
        bucket: rootLocation.bucket,
        credentials,
        region: 'region',
      },
      options: { preventOverwrite: true },
      prefix: '',
    });
  });

  it('calls `useProcessTasks` with the expected values when provided a nested `prefix`', async () => {
    useStoreSpy.mockReturnValue([
      {
        history: { current: location, previous: [location] },
        files: [fileItem],
      } as StoreModule.UseStoreState,
      dispatchStoreAction,
    ]);

    const handleProcessTasks = jest.fn();
    useProcessTasksSpy.mockReturnValue([
      [
        {
          ...fileItem,
          cancel: undefined,
          message: undefined,
          remove: jest.fn(),
          status: 'QUEUED',
        },
      ],
      handleProcessTasks,
    ]);

    const { getByText, getAllByRole } = render(<UploadControls />);

    const definitonEls = getAllByRole('definition');
    expect(definitonEls[0]).toHaveTextContent(location.prefix);

    const startButton = getByText('Start');
    expect(startButton).toBeInTheDocument();

    await user.click(startButton);

    expect(handleProcessTasks).toHaveBeenCalledTimes(1);
    expect(handleProcessTasks).toHaveBeenCalledWith({
      config: {
        bucket: location.bucket,
        credentials,
        region: 'region',
      },
      options: { preventOverwrite: true },
      prefix: location.prefix,
    });
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
