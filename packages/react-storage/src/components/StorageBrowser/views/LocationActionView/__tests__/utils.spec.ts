import { FileDataItem } from '../../../actions/handlers';
import { Tasks } from '../../../tasks';

import {
  getActionIconVariant,
  getFileTypeDisplayValue,
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

describe('getActionViewTableData', () => {
  const mockRemove = jest.fn();

  const tasks: Tasks<FileDataItem> = [
    {
      data: {
        id: '1',
        key: 'some-prefix/file1.txt',
        fileKey: 'file1.txt',
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
        key: 'some-prefix/file2.jpg',
        fileKey: 'file2.jpg',
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
        key: 'some-prefix/file3.pdf',
        fileKey: 'file3.pdf',
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
        key: 'some-prefix/file4.doc',
        fileKey: 'file4.doc',
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
        key: 'some-prefix/file5',
        fileKey: 'file5',
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
      path: '',
      isProcessing: true,
    });

    expect(result.rows).toMatchSnapshot('tabledata');
  });

  it('should handle tasks with prefix keys', () => {
    const tasks: Tasks<FileDataItem> = [
      {
        data: {
          id: '1',
          key: 'folder/subfolder/file1.txt',
          fileKey: 'file1.txt',
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
          fileKey: 'file2.jpg',
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
      tasks,
      path: '',
      isProcessing: true,
    });

    expect(result.rows).toMatchSnapshot();
  });

  it('should have remove handler on queued files', () => {
    const mockRemove = jest.fn();
    const mockCancel = jest.fn();
    const tasks: Tasks<FileDataItem> = [
      {
        data: {
          id: '1',
          fileKey: 'file1.txt',
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
      tasks,
      path: 'folder/subfolder/',
      isProcessing: false,
    });

    // last cell
    const actionCell =
      result.rows[0].content[result.rows[0].content.length - 1];

    expect(actionCell.content).toHaveProperty('onClick');
    expect(actionCell.content).toHaveProperty(
      'ariaLabel',
      'Remove item: file1.txt'
    );
    expect(result.rows).toMatchSnapshot();
  });
});
