import { FileData } from '../../../actions/handlers';
import { Tasks } from '../../../tasks';

import {
  getActionIconVariant,
  getActionViewDisabledButtons,
  getFileTypeDisplayValue,
  getFilenameWithoutPrefix,
  getActionViewTableData,
} from '../utils';

describe('getActionIconVariant', () => {
  it('should return correct icon variant for each status', () => {
    expect(getActionIconVariant('QUEUED')).toBe('action-queued');
    expect(getActionIconVariant('PENDING')).toBe('action-progress');
    expect(getActionIconVariant('COMPLETE')).toBe('action-success');
    expect(getActionIconVariant('FAILED')).toBe('action-error');
    expect(getActionIconVariant('CANCELED')).toBe('action-canceled');
  });
});

describe('getActionViewDisabledButtons', () => {
  it('should return correct statuses when no tasks have started', () => {
    const counts = {
      INITIAL: 0,
      QUEUED: 5,
      PENDING: 0,
      FAILED: 0,
      COMPLETE: 0,
      OVERWRITE_PREVENTED: 0,
      CANCELED: 0,
      TOTAL: 5,
    };
    const result = getActionViewDisabledButtons(counts);
    expect(result).toEqual({
      disableCancel: true,
      disableClose: false,
      disablePrimary: false,
    });
  });

  it('should return correct statuses when some tasks have started', () => {
    const counts = {
      INITIAL: 0,
      QUEUED: 3,
      PENDING: 2,
      FAILED: 0,
      COMPLETE: 0,
      CANCELED: 0,
      OVERWRITE_PREVENTED: 0,
      TOTAL: 5,
    };
    const result = getActionViewDisabledButtons(counts);
    expect(result).toEqual({
      disableCancel: false,
      disableClose: true,
      disablePrimary: true,
    });
  });

  it('should return correct statuses when all tasks have completed', () => {
    const counts = {
      INITIAL: 0,
      QUEUED: 0,
      PENDING: 0,
      FAILED: 1,
      COMPLETE: 3,
      CANCELED: 1,
      OVERWRITE_PREVENTED: 0,
      TOTAL: 5,
    };
    const result = getActionViewDisabledButtons(counts);
    expect(result).toEqual({
      disableCancel: true,
      disableClose: false,
      disablePrimary: true,
    });
  });
});

describe('getFileTypeDisplayValue', () => {
  it('should return the file extension', () => {
    expect(getFileTypeDisplayValue('document.pdf')).toBe('pdf');
    expect(getFileTypeDisplayValue('image.jpg')).toBe('jpg');
    expect(getFileTypeDisplayValue('script.ts')).toBe('ts');
  });

  it('should return an empty string for files without extension', () => {
    expect(getFileTypeDisplayValue('README')).toBe('');
  });
});

describe('getFilenameWithoutPrefix', () => {
  it('should return the filename without the path', () => {
    expect(getFilenameWithoutPrefix('/path/to/file.txt')).toBe('file.txt');
    expect(getFilenameWithoutPrefix('document.pdf')).toBe('document.pdf');
  });

  it('should handle paths with multiple slashes', () => {
    expect(getFilenameWithoutPrefix('/path//to///file.txt')).toBe('file.txt');
  });
});

describe('getActionViewTableData', () => {
  const mockRemove = jest.fn();
  const taskCounts = {
    INITIAL: 0,
    QUEUED: 1,
    PENDING: 1,
    FAILED: 1,
    COMPLETE: 1,
    CANCELED: 1,
    OVERWRITE_PREVENTED: 0,
    TOTAL: 5,
  };
  const tasks: Tasks<FileData> = [
    {
      data: {
        id: '1',
        key: 'file1.txt',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'QUEUED',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '2',
        key: 'file2.jpg',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'PENDING',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '3',
        key: 'file3.pdf',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'COMPLETE',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '4',
        key: 'file4.doc',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'FAILED',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
    {
      data: {
        id: '5',
        key: 'file5',
        lastModified: new Date(),
        size: 1000,
        type: 'FILE',
      },
      status: 'CANCELED',
      remove: mockRemove,
      cancel: jest.fn(),
      message: '',
      progress: undefined,
    },
  ];

  it('should return correct table data for all task statuses', () => {
    const result = getActionViewTableData({
      tasks,
      taskCounts,
      path: '',
    });

    expect(result.rows).toMatchSnapshot('tabledata');
  });

  it('should handle tasks with prefix keys', () => {
    const taskCounts = {
      INITIAL: 0,
      QUEUED: 1,
      PENDING: 0,
      FAILED: 0,
      COMPLETE: 1,
      CANCELED: 0,
      OVERWRITE_PREVENTED: 0,
      TOTAL: 2,
    };
    const tasksWithPaths: Tasks<FileData> = [
      {
        data: {
          id: '1',
          key: 'folder/subfolder/file1.txt',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'QUEUED',
        remove: mockRemove,
        cancel: jest.fn(),
        progress: undefined,
        message: '',
      },
      {
        data: {
          id: '2',
          key: '/root/file2.jpg',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'COMPLETE',
        remove: mockRemove,
        cancel: jest.fn(),
        message: '',
        progress: undefined,
      },
    ];

    const result = getActionViewTableData({
      tasks: tasksWithPaths,
      taskCounts,
      path: '',
    });

    expect(result.rows).toMatchSnapshot();
  });

  it('should have remove handler on queued files', () => {
    const taskCounts = {
      INITIAL: 0,
      QUEUED: 1,
      PENDING: 0,
      FAILED: 0,
      COMPLETE: 1,
      CANCELED: 0,
      OVERWRITE_PREVENTED: 0,
      TOTAL: 2,
    };
    const mockRemove = jest.fn();
    const mockCancel = jest.fn();
    const tasksWithPaths: Tasks<FileData> = [
      {
        data: {
          id: '1',
          key: 'folder/subfolder/file1.txt',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'QUEUED',
        remove: mockRemove,
        cancel: mockCancel,
        progress: undefined,
        message: '',
      },
    ];

    const result = getActionViewTableData({
      tasks: tasksWithPaths,
      taskCounts,
      path: 'folder/subfolder/',
    });
    const actionCell = result.rows[0].content.filter(
      (cell) => cell.key === 'action-1'
    )[0];
    expect(actionCell.content).toHaveProperty('onClick');
    expect(actionCell.content).toHaveProperty(
      'ariaLabel',
      'Cancel item: folder/subfolder/file1.txt'
    );
    expect(result.rows).toMatchSnapshot();
  });
});
