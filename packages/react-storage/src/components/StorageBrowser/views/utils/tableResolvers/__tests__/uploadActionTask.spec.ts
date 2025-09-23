import { capitalize } from '@aws-amplify/ui';

import { DataTableButtonDataCell } from '../../../../components';
import { UploadViewDisplayText } from '../../../../displayText';

import {
  MOCK_UPLOAD_TASKS_MULTIPART,
  MOCK_UPLOAD_TASKS_SINGLE_PART,
} from '../__testUtils__/tasks';
import { STATUS_ICONS, STATUS_LABELS } from '../constants';
import { UploadTableResolverProps } from '../types';
import { UPLOAD_TABLE_KEYS, UPLOAD_TABLE_RESOLVERS } from '../uploadResolvers';

const mockDisplayText: UploadViewDisplayText = {
  tableColumnNameHeader: 'Name',
  tableColumnFolderHeader: 'Folder',
  tableColumnTypeHeader: 'Type',
  tableColumnSizeHeader: 'Size',
  tableColumnStatusHeader: 'Status',
  tableColumnProgressHeader: 'Progress',
  tableColumnCancelHeader: 'Cancel',
  statusDisplayOverwritePreventedLabel: 'Overwrite Prevented',
};

const mockItems = Object.values(MOCK_UPLOAD_TASKS_SINGLE_PART);

const mockProps: UploadTableResolverProps = {
  displayText: mockDisplayText,
  isProcessing: true,
  isMultipartUpload: jest.fn(() => false),
  onTaskRemove: jest.fn(),
};

describe('UPLOAD_TABLE_RESOLVERS', () => {
  beforeEach(jest.clearAllMocks);

  describe('getCell', () => {
    it.each(UPLOAD_TABLE_KEYS)(
      'returns the expect cell `key` for a "%s" table `key`',
      (key) => {
        const data = {
          key,
          item: MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED,
          props: mockProps,
        };
        const cell = UPLOAD_TABLE_RESOLVERS.getCell(data);

        expect(cell).toBeDefined();
        expect(cell.key).toBe(
          `${key}-${MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED.data.id}`
        );
      }
    );

    describe('text cell resolvers', () => {
      it.each(mockItems)(
        'returns the expected cell values when `key` is "name" for an item with "$status" status',
        (item) => {
          const key = 'name';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: {
              icon: STATUS_ICONS[item.status],
              text: item.data.file.name,
            },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `folder` for an item with "$status" status',
        (item) => {
          const key = 'folder';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: item.data.file.webkitRelativePath },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `status` for an item with "$status" status',
        (item) => {
          const key = 'status';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: mockDisplayText[STATUS_LABELS[item.status]] },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `type` for an item with "$status" status',
        (item) => {
          const key = 'type';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: 'jpg' },
          });
        }
      );
    });

    describe('number cell resolvers', () => {
      it.each(mockItems)(
        'returns the expected cell values when `key` is `size` for an item with "$status" status',
        (item) => {
          const key = 'size';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'number',
            content: { value: item.data.file.size, displayValue: '100 B' },
          });
        }
      );

      it('returns the expected cell values when `key` is `progress` for an item with "QUEUED" status', () => {
        const key = 'progress';
        const item = MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED;
        const output = UPLOAD_TABLE_RESOLVERS.getCell({
          item,
          key,
          props: mockProps,
        });

        expect(output).toStrictEqual({
          key: `${key}-${item.data.id}`,
          type: 'number',
          content: { displayValue: '0%', value: 0 },
        });
      });

      it.each([
        MOCK_UPLOAD_TASKS_SINGLE_PART.FAILED,
        MOCK_UPLOAD_TASKS_SINGLE_PART.CANCELED,
        MOCK_UPLOAD_TASKS_SINGLE_PART.PENDING,
      ])(
        'returns the expected cell values when `key` is `progress` for an item with "$status" status',
        (item) => {
          const key = 'progress';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'number',
            content: { displayValue: '80%', value: 0.8 },
          });
        }
      );

      it.each([
        MOCK_UPLOAD_TASKS_SINGLE_PART.OVERWRITE_PREVENTED,
        MOCK_UPLOAD_TASKS_SINGLE_PART.COMPLETE,
      ])(
        'returns the expected cell values when `key` is `progress` for an item with "$status" status',
        (item) => {
          const key = 'progress';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'number',
            content: { displayValue: '100%', value: 1 },
          });
        }
      );
    });

    describe('button cell resolvers', () => {
      describe('cancel cell with single part upload', () => {
        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "true"', () => {
          const key = 'cancel';
          const item = MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED;
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Cancel item: ${item.data.file.name}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });

          (output as DataTableButtonDataCell).content.onClick?.();

          expect(item.cancel).toHaveBeenCalledTimes(1);
          expect(mockProps.onTaskRemove).not.toHaveBeenCalled();
        });

        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "false"', () => {
          const key = 'cancel';
          const item = MOCK_UPLOAD_TASKS_SINGLE_PART.QUEUED;
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: { ...mockProps, isProcessing: false },
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Remove item: ${item.data.file.name}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });

          (output as DataTableButtonDataCell).content.onClick?.();

          expect(item.cancel).not.toHaveBeenCalled();
          expect(mockProps.onTaskRemove).toHaveBeenCalledTimes(1);
          expect(mockProps.onTaskRemove).toHaveBeenCalledWith(item);
        });

        it.each([
          MOCK_UPLOAD_TASKS_SINGLE_PART.PENDING,
          MOCK_UPLOAD_TASKS_SINGLE_PART.COMPLETE,
        ])(
          'returns the expected cell values for an `item` with "$status" status',
          (item) => {
            const key = 'cancel';
            const output = UPLOAD_TABLE_RESOLVERS.getCell({
              item,
              key,
              props: mockProps,
            });

            expect(output).toStrictEqual({
              key: `${key}-${item.data.id}`,
              type: 'button',
              content: {
                ariaLabel: `Cancel item: ${item.data.file.name}`,
                isDisabled: true,
                onClick: undefined,
                icon: 'cancel',
              },
            });
          }
        );
      });

      describe('cancel cell with multipart upload', () => {
        const isMultipartUpload = jest.fn(() => true);

        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "true"', () => {
          const key = 'cancel';
          const item = MOCK_UPLOAD_TASKS_MULTIPART.QUEUED;
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: { ...mockProps, isMultipartUpload },
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Cancel item: ${item.data.file.name}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });

          (output as DataTableButtonDataCell).content.onClick?.();

          expect(item.cancel).toHaveBeenCalledTimes(1);
          expect(mockProps.onTaskRemove).not.toHaveBeenCalled();
        });

        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "false"', () => {
          const key = 'cancel';
          const item = MOCK_UPLOAD_TASKS_MULTIPART.QUEUED;
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: { ...mockProps, isMultipartUpload, isProcessing: false },
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Remove item: ${item.data.file.name}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });

          (output as DataTableButtonDataCell).content.onClick?.();

          expect(item.cancel).not.toHaveBeenCalled();
          expect(mockProps.onTaskRemove).toHaveBeenCalledTimes(1);
          expect(mockProps.onTaskRemove).toHaveBeenCalledWith(item);
        });

        it('returns the expected cell values for an `item` with "PENDING" status when `progress` has not reached `1`', () => {
          const item = MOCK_UPLOAD_TASKS_MULTIPART.PENDING;
          const key = 'cancel';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: { ...mockProps, isMultipartUpload },
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Cancel item: ${item.data.file.name}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });

          (output as DataTableButtonDataCell).content.onClick?.();

          expect(item.cancel).toHaveBeenCalledTimes(1);
          expect(mockProps.onTaskRemove).not.toHaveBeenCalled();
        });

        it('returns the expected cell values for an `item` with "PENDING" status when `progress` has reached `1`', () => {
          const item = {
            ...MOCK_UPLOAD_TASKS_MULTIPART.PENDING,
            progress: 1,
          };
          const key = 'cancel';
          const output = UPLOAD_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: { ...mockProps, isMultipartUpload },
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Cancel item: ${item.data.file.name}`,
              isDisabled: true,
              onClick: undefined,
              icon: 'cancel',
            },
          });
        });
      });
    });
  });

  describe('getHeader', () => {
    // filter out cancel, does not allow sorting
    it.each(UPLOAD_TABLE_KEYS.filter((key) => key !== 'cancel'))(
      'returns the expect header data for a %s column',
      (key) => {
        const data = { key, props: mockProps };
        const output = UPLOAD_TABLE_RESOLVERS.getHeader(data);

        expect(output).toStrictEqual({
          key,
          type: 'sort',
          content: { label: capitalize(key) },
        });
      }
    );

    it('returns the expect header data for a cancel column', () => {
      const key = 'cancel' as const;
      const data = { key, props: mockProps };
      const output = UPLOAD_TABLE_RESOLVERS.getHeader(data);

      expect(output).toStrictEqual({
        key,
        type: 'text',
        content: { text: capitalize(key) },
      });
    });
  });

  describe('getRowKey', () => {
    it('resolves a row key as expected', () => {
      const rowKey = UPLOAD_TABLE_RESOLVERS.getRowKey({
        item: MOCK_UPLOAD_TASKS_SINGLE_PART.PENDING,
        props: mockProps,
      });

      expect(rowKey).toBe(MOCK_UPLOAD_TASKS_SINGLE_PART.PENDING.data.id);
    });
  });
});
