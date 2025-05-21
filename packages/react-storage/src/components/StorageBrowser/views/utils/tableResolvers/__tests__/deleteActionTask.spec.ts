import { capitalize } from '@aws-amplify/ui';
import { DeleteViewDisplayText } from '../../../../displayText';

import { MOCK_DELETE_TASKS } from '../__testUtils__/tasks';
import {
  DEFAULT_ACTION_TABLE_KEYS,
  STATUS_ICONS,
  STATUS_LABELS,
} from '../constants';
import { DeleteActionTask, DeleteTableResolverProps } from '../types';
import { DELETE_TABLE_RESOLVERS } from '../deleteResolvers';

const mockDisplayText: DeleteViewDisplayText = {
  tableColumnNameHeader: 'Name',
  tableColumnFolderHeader: 'Folder',
  tableColumnTypeHeader: 'Type',
  tableColumnSizeHeader: 'Size',
  tableColumnStatusHeader: 'Status',
  tableColumnProgressHeader: 'Progress',
  tableColumnCancelHeader: 'Cancel',
};

const mockItems = Object.values(MOCK_DELETE_TASKS);

const mockProps: DeleteTableResolverProps = {
  displayText: mockDisplayText,
  isProcessing: true,
  onTaskRemove: jest.fn(),
};

describe('DELETE_TABLE_RESOLVERS', () => {
  beforeEach(jest.clearAllMocks);

  describe('getCell', () => {
    it.each(DEFAULT_ACTION_TABLE_KEYS)(
      'returns the expect cell `key` for a "%s" table `key`',
      (key) => {
        const data = {
          key,
          item: MOCK_DELETE_TASKS.QUEUED,
          props: mockProps,
        };
        const cell = DELETE_TABLE_RESOLVERS.getCell(data);

        expect(cell).toBeDefined();
        expect(cell.key).toBe(`${key}-${MOCK_DELETE_TASKS.QUEUED.data.id}`);
      }
    );

    describe('text cell resolvers', () => {
      it.each(mockItems)(
        'returns the expected cell values when `key` is "name" for an item with "$status" status',
        (item) => {
          const key = 'name';
          const output = DELETE_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: {
              icon: STATUS_ICONS[item.status],
              text: item.data.fileKey,
            },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `folder` for an item with "$status" status',
        (item) => {
          const key = 'folder';
          const output = DELETE_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: 'test-folder/' },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `status` for an item with "$status" status',
        (item) => {
          const key = 'status';
          const output = DELETE_TABLE_RESOLVERS.getCell({
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
          const output = DELETE_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: 'txt' },
          });
        }
      );

      describe('status cell', () => {
        it('returns an empty string for `context.text` when `item.status` is "OVERWRITE_PREVENTED"', () => {
          const key = 'status';

          const item = {
            ...MOCK_DELETE_TASKS.FAILED,
            status: 'OVERWRITE_PREVENTED',
          } as DeleteActionTask;

          const output = DELETE_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: '' },
          });
        });
      });
    });

    describe('number cell resolvers', () => {
      it.each(mockItems)(
        'returns the expected cell values when `key` is `size` for an item with "$status" status',
        (item) => {
          const key = 'size';
          const output = DELETE_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'number',
            content: { value: item.data.size, displayValue: '1.0 kB' },
          });
        }
      );
    });

    describe('button cell resolvers', () => {
      describe('cancel cell', () => {
        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "true"', () => {
          const key = 'cancel';
          const item = MOCK_DELETE_TASKS.QUEUED;
          const output = DELETE_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Cancel item: ${item.data.fileKey}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });
        });

        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "false"', () => {
          const key = 'cancel';
          const item = MOCK_DELETE_TASKS.QUEUED;
          const output = DELETE_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: { ...mockProps, isProcessing: false },
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Remove item: ${item.data.fileKey}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });
        });

        it.each([MOCK_DELETE_TASKS.PENDING, MOCK_DELETE_TASKS.COMPLETE])(
          'returns the expected cell values for an `item` with "$status" status',
          (item) => {
            const key = 'cancel';
            const output = DELETE_TABLE_RESOLVERS.getCell({
              item,
              key,
              props: mockProps,
            });

            expect(output).toStrictEqual({
              key: `${key}-${item.data.id}`,
              type: 'button',
              content: {
                ariaLabel: `Cancel item: ${item.data.fileKey}`,
                isDisabled: true,
                onClick: undefined,
                icon: 'cancel',
              },
            });
          }
        );
      });
    });
  });

  describe('getHeader', () => {
    // filter out cancel, does not allow sorting
    it.each(DEFAULT_ACTION_TABLE_KEYS.filter((key) => key !== 'cancel'))(
      'returns the expect header data for a %s column',
      (key) => {
        const data = { key, props: mockProps };
        const output = DELETE_TABLE_RESOLVERS.getHeader(data);

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
      const output = DELETE_TABLE_RESOLVERS.getHeader(data);

      expect(output).toStrictEqual({
        key,
        type: 'text',
        content: { text: capitalize(key) },
      });
    });
  });

  describe('getRowKey', () => {
    it('resolves a row key as expected', () => {
      const rowKey = DELETE_TABLE_RESOLVERS.getRowKey({
        item: MOCK_DELETE_TASKS.PENDING,
        props: mockProps,
      });

      expect(rowKey).toBe(MOCK_DELETE_TASKS.PENDING.data.id);
    });
  });
});
