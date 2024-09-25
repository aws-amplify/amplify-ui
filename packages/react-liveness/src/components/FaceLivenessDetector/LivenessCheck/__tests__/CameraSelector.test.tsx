import { render } from '@testing-library/react';
import { CameraSelector } from '../CameraSelector';
import React from 'react';

const mockMediaDevice: MediaDeviceInfo = {
  deviceId: 'foobar',
  groupId: 'foobar',
  kind: 'videoinput',
  label: 'foobar',
  toJSON: jest.fn(),
};

describe('CameraSelector', () => {
  it('should render', () => {
    const result = render(
      <CameraSelector
        onCameraChange={() => {}}
        selectableDevices={[mockMediaDevice]}
      />
    );

    expect(result.container).toBeDefined();
  });
});
