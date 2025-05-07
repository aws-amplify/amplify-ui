import { MULTIPART_UPLOAD_THRESHOLD_BYTES } from '../../../../actions/handlers/constants';
import type { TaskStatus } from '../../../../tasks';

import type {
  CopyActionTask,
  DeleteActionTask,
  UploadActionTask,
} from '../types';

type MockCopyOrDeleteTaskStatus = Exclude<TaskStatus, 'OVERWRITE_PREVENTED'>;

type MockCopyTasks = {
  [K in MockCopyOrDeleteTaskStatus]: Omit<CopyActionTask, 'status'> & {
    status: K;
  };
};

type MockDeleteTasks = {
  [K in MockCopyOrDeleteTaskStatus]: Omit<DeleteActionTask, 'status'> & {
    status: K;
  };
};

type MockUploadTasks = {
  [K in TaskStatus]: Omit<UploadActionTask, 'status'> & { status: K };
};

const MOCK_PREFIX = 'test-folder/';
const MOCK_COPY_OR_DELETE_TASK_BASE = {
  fileKey: 'file1.txt',
  lastModified: new Date(),
  size: 1000,
  type: 'FILE' as const,
};

const MOCK_COPY_DESTINATION_PREFIX = 'some-destination-folder/';
const MOCK_COPY_DATA: Omit<CopyActionTask['data'], 'id'> = {
  ...MOCK_COPY_OR_DELETE_TASK_BASE,
  key: `${MOCK_COPY_DESTINATION_PREFIX}${MOCK_PREFIX}file1.txt`,
  sourceKey: `${MOCK_PREFIX}file1.txt`,
};

export const MOCK_COPY_TASKS: MockCopyTasks = {
  CANCELED: {
    data: {
      ...MOCK_COPY_DATA,
      id: 'CANCELED-ID',
    },
    cancel: undefined,
    message: undefined,
    progress: undefined,
    status: 'CANCELED',
  },
  FAILED: {
    data: {
      ...MOCK_COPY_DATA,
      id: 'FAILED-ID',
    },
    cancel: undefined,
    status: 'FAILED',
    message: undefined,
    progress: undefined,
  },
  COMPLETE: {
    data: {
      ...MOCK_COPY_DATA,
      id: 'COMPLETE-ID',
    },
    cancel: undefined,
    status: 'COMPLETE',
    message: undefined,
    progress: undefined,
  },
  QUEUED: {
    data: {
      ...MOCK_COPY_DATA,
      id: 'QUEUED-ID',
    },
    cancel: jest.fn(),
    status: 'QUEUED',
    message: undefined,
    progress: undefined,
  },
  PENDING: {
    data: {
      ...MOCK_COPY_DATA,
      id: 'PENDING-ID',
    },
    cancel: undefined,
    status: 'PENDING',
    message: undefined,
    progress: undefined,
  },
};

const MOCK_DELETE_DATA: Omit<DeleteActionTask['data'], 'id'> = {
  ...MOCK_COPY_OR_DELETE_TASK_BASE,
  key: `${MOCK_PREFIX}file1.txt`,
};

export const MOCK_DELETE_TASKS: MockDeleteTasks = {
  CANCELED: {
    data: {
      ...MOCK_DELETE_DATA,
      id: 'CANCELED-ID',
    },
    cancel: undefined,
    message: undefined,
    progress: undefined,
    status: 'CANCELED',
  },
  FAILED: {
    data: {
      ...MOCK_DELETE_DATA,
      id: 'FAILED-ID',
    },
    status: 'FAILED',
    message: undefined,
    progress: undefined,
  },
  COMPLETE: {
    data: {
      ...MOCK_DELETE_DATA,
      id: 'COMPLETE-ID',
    },
    status: 'COMPLETE',
    message: undefined,
    progress: undefined,
  },
  QUEUED: {
    data: {
      ...MOCK_DELETE_DATA,
      id: 'QUEUED-ID',
    },
    cancel: jest.fn(),
    status: 'QUEUED',
    message: undefined,
    progress: undefined,
  },
  PENDING: {
    data: {
      ...MOCK_DELETE_DATA,
      id: 'PENDING-ID',
    },
    status: 'PENDING',
    message: undefined,
    progress: undefined,
  },
};

// single part upload
const SMALL_FILE = {
  name: 'SMALL_FILE.jpg',
  size: 100,
  webkitRelativePath: 'local-folder/',
} as File;
const SMALL_FILE_KEY = `target-prefix/${SMALL_FILE.name}`;

export const MOCK_UPLOAD_TASKS_SINGLE_PART: MockUploadTasks = {
  CANCELED: {
    data: { id: 'CANCELED-ID', key: SMALL_FILE_KEY, file: SMALL_FILE },
    cancel: undefined,
    message: undefined,
    progress: 0.8,
    status: 'CANCELED',
  },
  COMPLETE: {
    data: { id: 'COMPLETE-ID', key: SMALL_FILE_KEY, file: SMALL_FILE },
    cancel: undefined,
    message: undefined,
    progress: 1,
    status: 'COMPLETE',
  },
  FAILED: {
    data: { id: 'FAILED-ID', key: SMALL_FILE_KEY, file: SMALL_FILE },
    cancel: undefined,
    message: 'some error message',
    progress: 0.8,
    status: 'FAILED',
  },
  OVERWRITE_PREVENTED: {
    data: {
      id: 'OVERWRITE_PREVENTED-ID',
      key: SMALL_FILE_KEY,
      file: SMALL_FILE,
    },
    cancel: undefined,
    message: 'some error message',
    progress: 1,
    status: 'OVERWRITE_PREVENTED',
  },
  PENDING: {
    data: { id: 'PENDING-ID', key: SMALL_FILE_KEY, file: SMALL_FILE },
    cancel: jest.fn(),
    message: undefined,
    progress: 0.8,
    status: 'PENDING',
  },
  QUEUED: {
    data: { id: 'QUEUED-ID', key: SMALL_FILE_KEY, file: SMALL_FILE },
    cancel: jest.fn(),
    message: undefined,
    progress: undefined,
    status: 'QUEUED',
  },
};

// multipart upload
const LARGE_FILE = {
  name: 'LARGE_FILE.mpeg',
  size: 1.1 * MULTIPART_UPLOAD_THRESHOLD_BYTES,
  webkitRelativePath: 'local-folder/',
} as File;
const LARGE_FILE_KEY = `target-prefix/${LARGE_FILE.name}`;

export const MOCK_UPLOAD_TASKS_MULTIPART = Object.entries(
  MOCK_UPLOAD_TASKS_SINGLE_PART
).reduce(
  (items, [status, item]) => ({
    ...items,
    [status]: {
      ...item,
      data: { ...item.data, file: LARGE_FILE, key: LARGE_FILE_KEY },
    },
  }),
  {} as MockUploadTasks
);
