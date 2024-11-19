import {
  FolderData,
  LocationData,
  LocationItemData,
} from '../../../../actions';
import { FileItems } from '../../../../providers';
import { INITIAL_STATUS_COUNTS, StatusCounts } from '../../../../tasks';
import { UPLOAD_FILE_SIZE_LIMIT } from '../../../../validators/isFileTooBig';

export const ACTION_SCENARIOS: [string, StatusCounts][] = [
  ['all failed', { ...INITIAL_STATUS_COUNTS, FAILED: 11, TOTAL: 11 }],
  [
    'some failed',
    { ...INITIAL_STATUS_COUNTS, COMPLETE: 8, FAILED: 3, TOTAL: 11 },
  ],
  ['all success', { ...INITIAL_STATUS_COUNTS, COMPLETE: 11, TOTAL: 11 }],
  [
    'some failures, some prevented overwrites, some success',
    {
      ...INITIAL_STATUS_COUNTS,
      COMPLETE: 8,
      OVERWRITE_PREVENTED: 3,
      FAILED: 2,
      TOTAL: 13,
    },
  ],
  [
    'some failures, some prevented overwrites, no success',
    {
      ...INITIAL_STATUS_COUNTS,
      COMPLETE: 0,
      OVERWRITE_PREVENTED: 3,
      FAILED: 2,
      TOTAL: 5,
    },
  ],
  [
    'no failures, some prevented overwrites, some success',
    {
      ...INITIAL_STATUS_COUNTS,
      COMPLETE: 2,
      OVERWRITE_PREVENTED: 3,
      TOTAL: 5,
    },
  ],
  [
    'all prevented overwrites',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 3,
      TOTAL: 3,
    },
  ],
];

export const CREATE_FOLDER_ACTION_SCENARIOS: [string, StatusCounts][] = [
  ['failed', { ...INITIAL_STATUS_COUNTS, FAILED: 1, TOTAL: 1 }],
  [
    'overwrite prevented',
    { ...INITIAL_STATUS_COUNTS, OVERWRITE_PREVENTED: 1, TOTAL: 1 },
  ],
  ['success', { ...INITIAL_STATUS_COUNTS, COMPLETE: 1, TOTAL: 1 }],
];

export const UPLOAD_FILES_VALIDATION_SCENARIOS: [
  string,
  FileItems | undefined,
][] = [
  ['no files', undefined],
  ['empty file items', []],
  [
    'too large file',
    [
      {
        // @ts-expect-error: mock file
        file: { name: 'file1', size: UPLOAD_FILE_SIZE_LIMIT + 1 },
        key: 'file1',
        id: 'file1-id',
      },
      {
        // @ts-expect-error: mock file
        file: { name: 'file2', size: UPLOAD_FILE_SIZE_LIMIT },
        key: 'file2',
        id: 'file2-id',
      },
    ],
  ],
];

export const UPLOAD_ACTION_SCENARIOS: [string, StatusCounts][] = [
  ...ACTION_SCENARIOS,
  [
    'all overwrite prevented',
    { ...INITIAL_STATUS_COUNTS, OVERWRITE_PREVENTED: 11, TOTAL: 11 },
  ],
  ['all canceled', { ...INITIAL_STATUS_COUNTS, CANCELED: 11, TOTAL: 11 }],
  ['one canceled', { ...INITIAL_STATUS_COUNTS, CANCELED: 1, TOTAL: 11 }],
  ['few canceled', { ...INITIAL_STATUS_COUNTS, CANCELED: 5, TOTAL: 11 }],
  [
    'single overwrite prevented',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 1,
      COMPLETE: 10,
      TOTAL: 11,
    },
  ],
  [
    'single overwrite prevented with a failure',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 1,
      FAILED: 1,
      COMPLETE: 9,
      TOTAL: 11,
    },
  ],
  [
    'single overwrite prevented with failures',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 1,
      FAILED: 3,
      COMPLETE: 7,
      TOTAL: 11,
    },
  ],
  [
    'multiple overwrite prevented',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 3,
      COMPLETE: 8,
      TOTAL: 11,
    },
  ],
  [
    'multiple overwrite prevented with a failure',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 3,
      FAILED: 1,
      COMPLETE: 7,
      TOTAL: 11,
    },
  ],
  [
    'multiple overwrite prevented with failures',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 3,
      FAILED: 3,
      COMPLETE: 5,
      TOTAL: 11,
    },
  ],
  [
    'all overwrite prevented or failed',
    {
      ...INITIAL_STATUS_COUNTS,
      OVERWRITE_PREVENTED: 6,
      FAILED: 5,
      TOTAL: 11,
    },
  ],
];

export const LIST_FOLDERS_SCENARIOS: [
  string,
  {
    folders: FolderData[] | undefined;
    query?: string;
    hasError?: boolean;
    message?: string;
    hasExhaustedSearch?: boolean;
  },
][] = [
  ['empty results', { folders: [] }],
  [
    'failed',
    {
      // @ts-expect-error pretend folders
      folders: [...Array(101).keys()],
      hasError: true,
      message: 'Network got confused',
    },
  ],
  ['empty search results', { folders: [], query: 'something to look for' }],
  [
    'search failed',
    {
      // @ts-expect-error pretend folders
      folders: [...Array(101).keys()],
      query: 'something to look for',
      hasError: true,
      message: 'Network got confused',
    },
  ],
  [
    'search limit reached',
    {
      // @ts-expect-error pretend folders
      folders: [...Array(10000).keys()],
      query: 'something to look for',
    },
  ],
];

export const LIST_LOCATIONS_SCENARIOS: [
  string,
  {
    locations: LocationData[] | undefined;
    query?: string;
    hasError?: boolean;
    message?: string;
    isLoading?: boolean;
    hasExhaustedSearch?: boolean;
  },
][] = [
  ['empty results', { locations: [] }],
  [
    'failed',
    {
      // @ts-expect-error pretend folders
      locations: [...Array(101).keys()],
      hasError: true,
      message: 'Network got confused',
    },
  ],
  ['empty search results', { locations: [], query: 'something to look for' }],
  [
    'search failed',
    {
      // @ts-expect-error pretend folders
      locations: [...Array(101).keys()],
      query: 'something to look for',
      hasError: true,
      message: 'Network got confused',
    },
  ],
  [
    'search limit exhausted',
    {
      // @ts-expect-error pretend folders
      locations: [...Array(10000).keys()],
      query: 'something to look for',
      hasExhaustedSearch: true,
    },
  ],
  [
    'loading',
    {
      locations: [],
      isLoading: true,
      hasExhaustedSearch: false,
    },
  ],
];

export const LIST_ITEMS_SCENARIOS: [
  string,
  {
    items: LocationItemData[] | undefined;
    query?: string;
    hasError?: boolean;
    message?: string;
    isLoading?: boolean;
    hasExhaustedSearch?: boolean;
  },
][] = [
  ['empty results', { items: [] }],
  [
    'failed',
    {
      // @ts-expect-error pretend folders
      items: [...Array(101).keys()],
      hasError: true,
      message: 'Network got confused',
    },
  ],
  ['empty search results', { items: [], query: 'something to look for' }],
  [
    'search failed',
    {
      // @ts-expect-error pretend folders
      items: [...Array(101).keys()],
      query: 'something to look for',
      hasError: true,
      message: 'Network got confused',
    },
  ],
  [
    'search limit reached',
    {
      // @ts-expect-error pretend folders
      items: [...Array(10000).keys()],
      query: 'something to look for',
    },
  ],
  [
    'search exhausted',
    {
      // @ts-expect-error pretend folders
      items: [...Array(101).keys()],
      query: 'something to look for',
      hasExhaustedSearch: true,
    },
  ],
  [
    'loading',
    {
      items: [],
      isLoading: true,
      hasExhaustedSearch: false,
    },
  ],
];
