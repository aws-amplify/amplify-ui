import { LocationData } from '../../../actions';
import { DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT } from '../../../displayText/libraries/en/locationsView';

import { getLocationsViewTableData } from '../getLocationsViewTableData';
import { getHeaders } from '../getLocationsViewTableData/getHeaders';

jest.mock('../getLocationsViewTableData/getHeaders');

describe('getLocationsViewTableData', () => {
  const folderLocation1: LocationData = {
    bucket: 'bucket',
    id: 'id-1',
    permissions: ['get', 'list'],
    prefix: 'prefix-1/',
    type: 'PREFIX',
  };
  const folderLocation2: LocationData = {
    ...folderLocation1,
    id: 'id-2',
    prefix: 'prefix-2/',
  };
  const objectLocation: LocationData = {
    ...folderLocation1,
    id: 'id-3',
    prefix: 'object-3',
    type: 'OBJECT',
  };
  const listOnlyObjectLocation: LocationData = {
    ...objectLocation,
    id: 'id-4',
    prefix: 'object-4',
    permissions: ['list'],
  };

  const mockGetHeaders = jest.mocked(getHeaders);
  const mockOnNavigate = jest.fn();
  const mockOnDownload = jest.fn();

  beforeAll(() => {
    mockGetHeaders.mockReturnValue([
      {
        key: 'folder',
        type: 'sort',
        content: { label: 'Folder' },
      },
      {
        key: 'bucket',
        type: 'sort',
        content: { label: 'Bucket' },
      },
      {
        key: 'permission',
        type: 'sort',
        content: { label: 'Permission' },
      },
      {
        key: 'action',
        type: 'sort',
        content: { label: 'Actions' },
      },
    ]);
  });

  afterEach(() => {
    mockOnNavigate.mockClear();
  });

  it('should return table data with folder as expected', () => {
    expect(
      getLocationsViewTableData({
        onDownload: mockOnDownload,
        pageItems: [folderLocation1],
        onNavigate: mockOnNavigate,
        displayText: DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT,
      })
    ).toStrictEqual({
      headers: [
        expect.objectContaining({ content: { label: 'Folder' } }),
        expect.objectContaining({ content: { label: 'Bucket' } }),
        expect.objectContaining({ content: { label: 'Permission' } }),
        expect.objectContaining({ content: { label: 'Actions' } }),
      ],
      rows: [
        expect.objectContaining({
          content: [
            expect.objectContaining({
              type: 'button',
              content: expect.objectContaining({
                label: folderLocation1.prefix,
              }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({
                text: folderLocation1.bucket,
              }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: 'Read' }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: '' }),
            }),
          ],
        }),
      ],
    });
  });

  it('should return table data with object as expected', () => {
    expect(
      getLocationsViewTableData({
        onDownload: mockOnDownload,
        pageItems: [objectLocation],
        onNavigate: mockOnNavigate,
        displayText: DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT,
      })
    ).toMatchObject({
      rows: [
        expect.objectContaining({
          content: [
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: objectLocation.prefix }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: objectLocation.bucket }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: 'Read' }),
            }),
            expect.objectContaining({
              type: 'button',
              content: expect.objectContaining({ icon: 'download' }),
            }),
          ],
        }),
      ],
    });
  });

  /**
   * List-only permission and object location type does not co-exist in a single auth mode. This validation
   * ensures UI to be agnostic to the auth modes.
   **/
  it('should return table data with list-only object as expected', () => {
    expect(
      getLocationsViewTableData({
        onDownload: mockOnDownload,
        pageItems: [listOnlyObjectLocation],
        onNavigate: mockOnNavigate,
        displayText: DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT,
      })
    ).toMatchObject({
      rows: [
        expect.objectContaining({
          content: [
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({
                text: listOnlyObjectLocation.prefix,
              }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({
                text: listOnlyObjectLocation.bucket,
              }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: 'Read' }),
            }),
            // Download button should not be rendered.
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: '' }),
            }),
          ],
        }),
      ],
    });
  });

  it('uses bucket label when prefix is empty', () => {
    expect(
      getLocationsViewTableData({
        pageItems: [{ ...folderLocation1, prefix: '' }],
        onNavigate: mockOnNavigate,
        onDownload: mockOnDownload,
        displayText: DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT,
      })
    ).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({
            content: expect.arrayContaining([
              expect.objectContaining({
                type: 'button',
                content: expect.objectContaining({
                  label: folderLocation1.bucket,
                }),
              }),
            ]),
          }),
        ],
      })
    );
  });

  it('navigates to corresponding locations', () => {
    const tableData = getLocationsViewTableData({
      pageItems: [folderLocation1, folderLocation2],
      onNavigate: mockOnNavigate,
      onDownload: mockOnDownload,
      displayText: DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT,
    });
    const [row1FirstContent] = tableData.rows[0].content;
    const [row2FirstContent] = tableData.rows[1].content;
    if (
      row1FirstContent.type === 'button' &&
      row2FirstContent.type === 'button'
    ) {
      row2FirstContent.content.onClick?.();
      row1FirstContent.content.onClick?.();
    }
    expect(mockOnNavigate).toHaveBeenNthCalledWith(1, folderLocation2);
    expect(mockOnNavigate).toHaveBeenNthCalledWith(2, folderLocation1);
  });
});
