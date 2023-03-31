import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { useDropZone, UseDropZoneProps } from '../useDropZone';

jest.mock('@aws-amplify/storage');

const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const mockOnChange = jest.fn();
const dropZoneProps: UseDropZoneProps = {
  onChange: mockOnChange,
};
type DragEvent = React.DragEvent<HTMLDivElement>;

describe('useDropZone', () => {
  afterEach(() => jest.clearAllMocks());

  it('should set inDropZone state to true when drag event occurs inside the drop zone', () => {
    const { result } = renderHook(() => useDropZone(dropZoneProps));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: { dropEffect: '' },
    } as unknown as DragEvent;

    act(() => {
      result.current.onDragOver?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
    expect(event.dataTransfer.dropEffect).toEqual('copy');
  });

  it('clears the data when drag event begins', () => {
    const { result } = renderHook(() => useDropZone(dropZoneProps));
    const event = {
      dataTransfer: { clearData: () => '' },
    } as unknown as DragEvent;
    const clearDataSpy = jest.spyOn(event.dataTransfer, 'clearData');

    act(() => {
      result.current.onDragStart?.(event);
    });

    expect(clearDataSpy).toBeCalledTimes(1);
  });

  it('should call onChange function with the event object when drop event occurs inside the drop zone', () => {
    const { result } = renderHook(() => useDropZone(dropZoneProps));

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: { dropEffect: '', files: [mockFile] },
    } as unknown as DragEvent;

    act(() => {
      result.current.onDrop?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
    expect(mockOnChange).toBeCalled();
  });

  it('prevents and stops event onDragEnter', () => {
    const { result } = renderHook(() => useDropZone(dropZoneProps));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as DragEvent;

    act(() => {
      result.current.onDragEnter?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
  });

  it('prevents default and propagation onDragLeave', () => {
    const { result } = renderHook(() => useDropZone(dropZoneProps));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as DragEvent;

    act(() => {
      result.current.onDragLeave?.(event);
    });

    expect(event.preventDefault).toBeCalled();
    expect(event.stopPropagation).toBeCalled();
    expect(result.current.inDropZone).toBe(false);
  });
});
