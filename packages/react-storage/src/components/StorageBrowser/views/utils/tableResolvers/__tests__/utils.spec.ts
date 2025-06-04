import {
  MOCK_COPY_TASKS,
  MOCK_DELETE_TASKS,
  MOCK_UPLOAD_TASKS_SINGLE_PART,
} from '../__testUtils__/tasks';
import {
  getFileDataCancelCellContent,
  getFileSize,
  getFileType,
  getUploadCellFolder,
  getUploadCellProgress,
} from '../utils';

describe('table resolver utils', () => {
  describe.each([
    { name: 'copy', tasks: MOCK_COPY_TASKS },
    { name: 'delete', tasks: MOCK_DELETE_TASKS },
  ])('getCopyOrDeleteCancelCellContent with $name tasks', ({ tasks }) => {
    const onTaskRemove = jest.fn();
    const props = { displayText: {}, onTaskRemove };

    beforeEach(jest.clearAllMocks);

    it('returns the expected values for a QUEUED task prior to processing', () => {
      const item = tasks.QUEUED;
      const output = getFileDataCancelCellContent({
        item,
        key: 'cancel',
        props: { ...props, isProcessing: false },
      });

      expect(output).toStrictEqual({
        ariaLabel: 'Remove item: file1.txt',
        icon: 'cancel',
        isDisabled: false,
        onClick: expect.any(Function),
      });
    });

    it('returns the expected values for a QUEUED task during processing', () => {
      const item = tasks.QUEUED;
      const output = getFileDataCancelCellContent({
        item,
        key: 'cancel',
        props: { ...props, isProcessing: true },
      });

      expect(output).toStrictEqual({
        ariaLabel: 'Cancel item: file1.txt',
        icon: 'cancel',
        isDisabled: false,
        onClick: expect.any(Function),
      });
    });

    it('returns the expected values for a PENDING task', () => {
      const item = tasks.PENDING;
      const output = getFileDataCancelCellContent({
        item,
        key: 'cancel',
        props: { ...props, isProcessing: true },
      });

      expect(output).toStrictEqual({
        ariaLabel: 'Cancel item: file1.txt',
        icon: 'cancel',
        isDisabled: true,
        onClick: undefined,
      });
    });

    it('returns the expected values for a CANCELED task', () => {
      const item = tasks.CANCELED;
      const output = getFileDataCancelCellContent({
        item,
        key: 'cancel',
        props: { ...props, isProcessing: true },
      });

      expect(output).toStrictEqual({
        ariaLabel: 'Cancel item: file1.txt',
        icon: 'cancel',
        isDisabled: true,
        onClick: undefined,
      });
    });

    it('returns the expected values for a COMPLETE task', () => {
      const item = tasks.COMPLETE;
      const output = getFileDataCancelCellContent({
        item,
        key: 'cancel',
        props: { ...props, isProcessing: true },
      });

      expect(output).toStrictEqual({
        ariaLabel: 'Cancel item: file1.txt',
        icon: 'cancel',
        isDisabled: true,
        onClick: undefined,
      });
    });

    it('calls onTaskRemove with the expected values for a removable task', () => {
      const item = tasks.QUEUED;
      const output = getFileDataCancelCellContent({
        item,
        key: 'cancel',
        props: { ...props, isProcessing: false },
      });

      expect(output).toStrictEqual({
        ariaLabel: 'Remove item: file1.txt',
        icon: 'cancel',
        isDisabled: false,
        onClick: expect.any(Function),
      });

      output.onClick?.();

      expect(onTaskRemove).toHaveBeenCalledTimes(1);
      expect(onTaskRemove).toHaveBeenCalledWith({
        cancel: expect.any(Function),
        data: item.data,
        message: undefined,
        progress: undefined,
        status: 'QUEUED',
      });
      expect(item.cancel).not.toHaveBeenCalled();
    });

    it('calls onTaskRemove with the expected values for a cancelable task', () => {
      const item = tasks.QUEUED;
      const output = getFileDataCancelCellContent({
        item,
        key: 'cancel',
        props: { ...props, isProcessing: true },
      });

      expect(output).toStrictEqual({
        ariaLabel: 'Cancel item: file1.txt',
        icon: 'cancel',
        isDisabled: false,
        onClick: expect.any(Function),
      });

      output.onClick?.();

      expect(item.cancel).toHaveBeenCalledTimes(1);
      expect(onTaskRemove).not.toHaveBeenCalled();
    });
  });

  describe('getFileSize', () => {
    it('behaves as expected in the happy path', () => {
      const output = getFileSize(12000, '-');
      expect(output).toBe('12.0 kB');
    });

    it('returns the fallback value when called with `undefined`', () => {
      const output = getFileSize(undefined, '-');
      expect(output).toBe('-');
    });
  });

  describe('getFileType', () => {
    it('behaves as expected in the happy path', () => {
      const fileKey = 'test.jpg';
      const output = getFileType(fileKey);
      expect(output).toBe('jpg');
    });

    it('behaves as expected when the provided value has two multiple "."s', () => {
      const fileKey = 'test.test.jpg';
      const output = getFileType(fileKey);
      expect(output).toBe('jpg');
    });

    it('returns an empty string when provided value does not contain a "."', () => {
      const fileKey = 'testjpg';
      const output = getFileType(fileKey);
      expect(output).toBe('');
    });
  });

  describe('getUploadCellFolder', () => {
    it('behaves as expected in the happy path', () => {
      const item = MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED;
      const output = getUploadCellFolder(item);
      expect(output).toBe(item.data.file.webkitRelativePath);
    });

    it('returns the fallback value when a file is missing a webkitRelativePath', () => {
      const item = {
        ...MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED,
        data: {
          ...MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED.data,
          file: {
            ...MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED.data.file,
            // @ts-expect-error force allow
            webkitRelativePath: undefined as string,
          },
        },
      };
      const output = getUploadCellFolder(item);
      expect(output).toBe('-');
    });
  });

  describe('getUploadCellProgress', () => {
    it('behaves as expected in the happy path', () => {
      const output = getUploadCellProgress({
        data: { file: {} as File, key: 'key', id: 'id' },
        progress: 0.8,
        status: 'PENDING',
      });

      expect(output.displayValue).toBe('80%');
      expect(output.value).toBe(0.8);
    });

    it('behaves as expected when progress is undefined and status is COMPLETE', () => {
      const output = getUploadCellProgress({
        data: { file: {} as File, key: 'key', id: 'id' },
        progress: undefined,
        status: 'COMPLETE',
      });

      expect(output.displayValue).toBe('100%');
      expect(output.value).toBe(1);
    });

    it('behaves as expected when progress is undefined and status is not COMPLETE', () => {
      const output = getUploadCellProgress({
        data: { file: {} as File, key: 'key', id: 'id' },
        progress: undefined,
        status: 'PENDING',
      });

      expect(output.displayValue).toBe('0%');
      expect(output.value).toBe(0);
    });
  });
});
