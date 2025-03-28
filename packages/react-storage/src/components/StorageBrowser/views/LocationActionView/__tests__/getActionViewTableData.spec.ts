import { FileDataItem } from '../../../actions';
import { DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT } from '../../../displayText/libraries/en/uploadView';
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
        message: undefined,
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
        message: undefined,
        progress: 0.2,
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
        cancel: undefined,
        message: undefined,
        progress: 1,
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
        cancel: undefined,
        message: 'Failed!',
        progress: 0.7,
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
        cancel: undefined,
        message: 'Canceled!',
        progress: 0.2,
      },
    ];
    const result = getActionViewTableData({
      tasks,
      displayText: DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT,
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
        status: 'PENDING',
        cancel: jest.fn(),
        progress: undefined,
        message: undefined,
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
        cancel: undefined,
        message: undefined,
        progress: 1,
      },
    ];

    const result = getActionViewTableData({
      tasks,
      displayText: DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT,
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
      displayText: DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT,
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

  it('should return the right display value for progress', () => {
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
        progress: 0,
        message: '',
      },
      {
        data: {
          id: '2',
          fileKey: 'file2.txt',
          key: 'folder/subfolder/file2.txt',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'PENDING',
        cancel: jest.fn(),
        progress: 0.5,
        message: '',
      },
      {
        data: {
          id: '3',
          fileKey: 'file3.txt',
          key: 'folder/subfolder/file3.txt',
          lastModified: new Date(),
          size: 1000,
          type: 'FILE',
        },
        status: 'COMPLETE',
        cancel: jest.fn(),
        progress: 1,
        message: '',
      },
    ];

    const result = getActionViewTableData({
      tasks,
      displayText: DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT,
      isProcessing: false,
      onTaskRemove: jest.fn(),
      shouldDisplayProgress: true,
    });

    const zero = result.rows[0].content[5].content;
    const half = result.rows[1].content[5].content;
    const full = result.rows[2].content[5].content;

    expect((zero as { displayValue: string }).displayValue).toBe('0%');
    expect((half as { displayValue: string }).displayValue).toBe('50%');
    expect((full as { displayValue: string }).displayValue).toBe('100%');
  });
});
