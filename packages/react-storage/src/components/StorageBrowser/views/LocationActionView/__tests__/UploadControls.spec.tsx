import React from 'react';
import { render } from '@testing-library/react';

import * as ConfigModule from '../../../providers/configuration';
import * as StoreModule from '../../../providers/store';

import { UploadControls, ActionIcon, ICON_CLASS } from '../UploadControls';

jest.mock('../Controls/Title');

const useStoreSpy = jest.spyOn(StoreModule, 'useStore');

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

const config: ConfigModule.GetActionInput = jest.fn(() => ({
  credentials: jest.fn(),
  bucket: location.bucket,
  region: 'region',
}));

jest.spyOn(ConfigModule, 'useGetActionInput').mockReturnValue(config);

describe('UploadControls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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
