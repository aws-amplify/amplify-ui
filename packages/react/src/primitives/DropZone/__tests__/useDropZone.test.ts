import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useDropZone } from '../useDropZone';
import { UseDropZoneProps } from '../types';

const mockFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const mockOnDropComplete = jest.fn();
const dropZoneProps: UseDropZoneProps = {
  onDropComplete: mockOnDropComplete,
};
type DragEvent = React.DragEvent<HTMLDivElement>;

describe('useDropZone', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return default values', () => {
    const { result } = renderHook(() =>
      useDropZone({
        onDropComplete: () => {},
      })
    );
    expect(result.current.onDragStart).toBeInstanceOf(Function);
    expect(result.current.onDragEnter).toBeInstanceOf(Function);
    expect(result.current.onDragLeave).toBeInstanceOf(Function);
    expect(result.current.onDragOver).toBeInstanceOf(Function);
    expect(result.current.onDrop).toBeInstanceOf(Function);
    expect(result.current.dragState).toBe('inactive');
  });

  it('should set isDragActive state to true when drag event occurs inside the drop zone', () => {
    const { result } = renderHook(() => useDropZone(dropZoneProps));
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: { dropEffect: '', items: [] },
    } as unknown as DragEvent;

    act(() => {
      result.current.onDragOver?.(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(event.dataTransfer.dropEffect).toEqual('copy');
    expect(result.current.dragState).toBe('accept');
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

    expect(clearDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should call onDropComplete function with the event object when drop event occurs inside the drop zone', () => {
    const { result } = renderHook(() => useDropZone(dropZoneProps));

    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      dataTransfer: { dropEffect: '', files: [mockFile] },
    } as unknown as DragEvent;

    act(() => {
      result.current.onDrop?.(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(mockOnDropComplete).toHaveBeenCalled();
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

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
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

    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(result.current.dragState).toBe('inactive');
  });
});
