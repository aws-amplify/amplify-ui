import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useDropZone } from '../useDropZone';

describe('useDropZone', () => {
  it('should return default values', () => {
    const { result } = renderHook(() =>
      useDropZone({
        onDrop: () => {},
      })
    );
    expect(result.current.onDragStart).toBeInstanceOf(Function);
    expect(result.current.onDragEnter).toBeInstanceOf(Function);
    expect(result.current.onDragLeave).toBeInstanceOf(Function);
    expect(result.current.onDragOver).toBeInstanceOf(Function);
    expect(result.current.onDrop).toBeInstanceOf(Function);
    expect(result.current.isDragActive).toBe(false);
    expect(result.current.isDragAccept).toBe(false);
    expect(result.current.isDragReject).toBe(false);
  });
});
