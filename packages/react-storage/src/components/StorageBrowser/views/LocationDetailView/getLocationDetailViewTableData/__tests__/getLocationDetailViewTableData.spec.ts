import { LocationData } from '../../../../actions';
import { DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT } from '../../../../displayText/libraries/en/locationDetailView';

import { getFileRowContent } from '../getFileRowContent';
import { getFolderRowContent } from '../getFolderRowContent';
import { getLocationDetailViewTableData } from '../getLocationDetailViewTableData';

jest.mock('../getFileRowContent');
jest.mock('../getFolderRowContent');

describe('getLocationDetailViewTableData', () => {
  const displayText = DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT;
  const location = {
    current: {
      bucket: 'bucket',
      id: 'id',
      permissions: ['get', 'list'],
      prefix: 'prefix/',
      type: 'PREFIX',
    } as LocationData,
    path: 'path/',
    key: 'prefix/path/',
  };
  const fileItem = {
    key: 'file-key.ext',
    fileKey: 'file-key.ext',
    lastModified: new Date(1),
    id: 'file-id',
    size: 1,
    type: 'FILE',
  } as const;
  const folderItem = {
    key: `${location.current.prefix}${location.path}folder/`,
    id: 'folder-id',
    type: 'FOLDER',
  } as const;
  // assert mocks
  const mockGetFileRowContent = jest.mocked(getFileRowContent);
  const mockGetFolderRowContent = jest.mocked(getFolderRowContent);

  // create mocks
  const mockOnDownload = jest.fn();
  const mockOnNavigate = jest.fn();
  const mockOnSelect = jest.fn();
  const mockOnSelectAll = jest.fn();

  beforeAll(() => {
    mockGetFileRowContent.mockImplementation(({ onDownload, onSelect }) => [
      {
        key: 'file-checkbox',
        type: 'checkbox',
        content: { onSelect },
      },
      { key: 'file-name', type: 'text', content: { text: fileItem.key } },
      { key: 'file-type', type: 'text', content: { text: 'ext' } },
      {
        key: 'file-last-modified',
        type: 'date',
        content: { date: fileItem.lastModified },
      },
      { key: 'file-size', type: 'number', content: { value: fileItem.size } },
      {
        key: 'file-download',
        type: 'button',
        content: { onClick: onDownload },
      },
    ]);
    mockGetFolderRowContent.mockImplementation(({ onNavigate }) => [
      { key: 'folder-checkbox', type: 'text', content: { text: '' } },
      {
        key: 'folder-name',
        type: 'button',
        content: {
          label: folderItem.key,
          onClick: onNavigate,
        },
      },
      { key: 'folder-type', type: 'text', content: { text: 'Folder' } },
      { key: 'folder-last-modified', type: 'text', content: { text: '' } },
      { key: 'folder-size', type: 'text', content: { text: '' } },
      { key: 'folder-download', type: 'text', content: { text: '' } },
    ]);
  });

  afterEach(() => {
    mockOnDownload.mockClear();
    mockOnNavigate.mockClear();
    mockOnSelect.mockClear();
    mockOnSelectAll.mockClear();
    mockGetFileRowContent.mockClear();
    mockGetFolderRowContent.mockClear();
  });

  it('should return table data as expected', () => {
    expect(
      getLocationDetailViewTableData({
        areAllFilesSelected: false,
        displayText,
        location,
        hasFiles: true,
        pageItems: [folderItem, folderItem, fileItem, fileItem, fileItem],
        onDownload: mockOnDownload,
        getDateDisplayValue: (date: Date) => date.toLocaleString(),
        selectAllFilesLabel: 'Select all files',
        selectFileLabel: 'Select file',
        onNavigate: mockOnNavigate,
        onSelect: mockOnSelect,
        onSelectAll: mockOnSelectAll,
        onOpenFilePreview: jest.fn(),
      })
    ).toStrictEqual(
      expect.objectContaining({
        headers: [
          expect.objectContaining({
            type: 'checkbox',
            content: expect.objectContaining({ checked: false }),
          }),
          expect.objectContaining({ content: { label: 'Name' } }),
          expect.objectContaining({ content: { label: 'Type' } }),
          expect.objectContaining({ content: { label: 'Last modified' } }),
          expect.objectContaining({ content: { label: 'Size' } }),
          expect.objectContaining({ content: { text: '' } }),
        ],
        rows: expect.any(Array),
      })
    );
    expect(mockGetFileRowContent).toHaveBeenCalledTimes(3);
    expect(mockGetFolderRowContent).toHaveBeenCalledTimes(2);
  });

  it('should select all files', () => {
    const tableData = getLocationDetailViewTableData({
      areAllFilesSelected: false,
      displayText,
      location,
      hasFiles: true,
      pageItems: [folderItem, fileItem],
      selectAllFilesLabel: 'Select all files',
      selectFileLabel: 'Select file',
      getDateDisplayValue: (date: Date) => date.toLocaleString(),
      onDownload: mockOnDownload,
      onNavigate: mockOnNavigate,
      onSelect: mockOnSelect,
      onSelectAll: mockOnSelectAll,
      onOpenFilePreview: jest.fn(),
    });

    const [firstHeader] = tableData.headers;
    if (firstHeader.type === 'checkbox') {
      firstHeader.content.onSelect?.();
    }
    expect(mockOnSelectAll).toHaveBeenCalledTimes(1);
  });

  it('should select a file', () => {
    const tableData = getLocationDetailViewTableData({
      areAllFilesSelected: false,
      displayText,
      location,
      hasFiles: true,
      pageItems: [fileItem],
      selectAllFilesLabel: 'Select all files',
      selectFileLabel: 'Select file',
      getDateDisplayValue: (date: Date) => date.toLocaleString(),
      onDownload: mockOnDownload,
      onNavigate: mockOnNavigate,
      onSelect: mockOnSelect,
      onSelectAll: mockOnSelectAll,
      onOpenFilePreview: jest.fn(),
    });

    const [checkbox] = tableData.rows[0].content;
    if (checkbox.type === 'checkbox') {
      checkbox.content.onSelect?.();
    }
    expect(mockOnSelect).toHaveBeenCalledWith(false, fileItem);
  });

  it('should download a file', () => {
    const tableData = getLocationDetailViewTableData({
      areAllFilesSelected: false,
      displayText,
      location,
      hasFiles: true,
      pageItems: [fileItem],
      selectAllFilesLabel: 'Select all files',
      selectFileLabel: 'Select file',
      getDateDisplayValue: (date: Date) => date.toLocaleString(),
      onDownload: mockOnDownload,
      onNavigate: mockOnNavigate,
      onSelect: mockOnSelect,
      onSelectAll: mockOnSelectAll,
      onOpenFilePreview: jest.fn(),
    });

    const download = tableData.rows[0].content[5];
    if (download.type === 'button') {
      download.content.onClick?.();
    }
    expect(mockOnDownload).toHaveBeenCalledWith(fileItem);
  });

  it('should navigate to a folder', () => {
    const tableData = getLocationDetailViewTableData({
      areAllFilesSelected: false,
      displayText,
      location,
      hasFiles: true,
      pageItems: [folderItem],
      selectAllFilesLabel: 'Select all files',
      selectFileLabel: 'Select file',
      getDateDisplayValue: (date: Date) => date.toLocaleString(),
      onDownload: mockOnDownload,
      onNavigate: mockOnNavigate,
      onSelect: mockOnSelect,
      onSelectAll: mockOnSelectAll,
      onOpenFilePreview: jest.fn(),
    });

    const button = tableData.rows[0].content[1];
    if (button.type === 'button') {
      button.content.onClick?.();
    }
    expect(mockOnNavigate).toHaveBeenCalledWith(
      { ...location.current, id: folderItem.id },
      `${location.path}folder/`
    );
  });
});
