import { fireEvent, render, screen } from '@testing-library/react';
import { CameraSelector } from '../CameraSelector';
import React from 'react';

const mockMediaDevices: MediaDeviceInfo[] = [
  {
    deviceId: '1',
    groupId: 'foobar',
    label: 'Camera 1',
    kind: 'videoinput',
    toJSON: jest.fn(),
  },
  {
    deviceId: '2',
    groupId: 'foobar',
    label: 'Camera 2',
    kind: 'videoinput',
    toJSON: jest.fn(),
  },
];

const onChange = jest.fn();
describe('CameraSelector', () => {
  beforeEach(() => {
    onChange.mockClear();
  });

  it('should render', () => {
    const result = render(
      <CameraSelector onSelect={onChange} devices={mockMediaDevices} />
    );

    expect(result.container).toBeDefined();
  });

  it('renders CameraSelector when there are multiple devices and allows changing camera', async () => {
    render(<CameraSelector onSelect={onChange} devices={mockMediaDevices} />);

    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement).toBeInTheDocument();
    expect(selectElement.value).toBe('1');

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(2);
    expect(options[0].textContent).toBe('Camera 1');
    expect(options[1].textContent).toBe('Camera 2');

    // Simulate selecting the back camera
    fireEvent.change(selectElement, { target: { value: '2' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(selectElement.value).toBe('2');
  });
});
