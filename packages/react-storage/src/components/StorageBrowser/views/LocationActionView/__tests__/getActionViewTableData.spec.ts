import { FileDataItem } from '../../../actions/handlers';
import { Tasks } from '../../../tasks';

import { getActionViewTableData } from '../getActionViewTableData';

describe('getActionViewTableData', () => {
  it('should return correct table data for all task statuses', () => {
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
        cancel: jest.fn(),
        message: '',
        progress: undefined,
      },
    ];
    const result = getActionViewTableData({
      tasks,
      isProcessing: true,
      onTaskRemove: jest.fn(),
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

        cancel: jest.fn(),
        message: '',
        progress: undefined,
      },
    ];

    const result = getActionViewTableData({
      tasks,
      isProcessing: true,
      onTaskRemove: jest.fn(),
    });

    expect(result.rows).toMatchSnapshot();
  });

  it('should have remove handler on queued files', () => {
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

        cancel: jest.fn(),
        progress: undefined,
        message: '',
      },
    ];

    const result = getActionViewTableData({
      tasks,
      locationKey: 'folder/subfolder/',
      isProcessing: false,
      onTaskRemove: jest.fn(),
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
