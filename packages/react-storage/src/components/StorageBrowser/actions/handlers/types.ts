import type { LocationCredentialsProvider } from '../../storage-internal';

/**
 * `location` grant scope
 */
export type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';

/**
 * `location` grant permissions
 */
export type LocationPermissions = ('delete' | 'get' | 'list' | 'write')[];

/**
 * `location` metadata
 */
export interface LocationData {
  /**
   * `location` s3 bucket
   */
  bucket: string;

  /**
   * Unique identifier
   */
  id: string;

  /**
   * @see {@link LocationPermissions}
   */
  permissions: LocationPermissions;

  /**
   * `location` base prefix, delimited by `'/'`. Empty string indicates bucket root
   */
  prefix: string;

  /**
   * @see {@link LocationType}
   */
  type: LocationType;
}

export interface FolderData {
  key: string;
  id: string;
  type: 'FOLDER';
}

export interface FileData {
  eTag?: string;
  key: string;
  lastModified: Date;
  id: string;
  size: number;
  type: 'FILE';
}

export type LocationItemData = FileData | FolderData;

export interface FileDataItem extends FileData, TaskData {
  fileKey: string;
}

export interface FileItem extends TaskData {
  file: File;
}

export interface OptionalFileData
  extends Partial<Omit<FileData, 'id' | 'key'>> {}

export interface ActionInputConfig {
  accountId?: string;
  bucket: string;
  credentials: LocationCredentialsProvider;
  customEndpoint?: string;
  region: string;
}

interface ActionInput<T = any> {
  config: ActionInputConfig;
  prefix: string;
  options?: T;
}

export interface TaskData {
  key: string;
  id: string;
}

export interface TaskHandlerOptions {
  onProgress?: (
    data: { key: string; id: string },
    progress: number | undefined
  ) => void;
}

export interface TaskHandlerInput<
  TData extends TaskData = TaskData,
  TOptions extends TaskHandlerOptions = TaskHandlerOptions,
> {
  config: ActionInputConfig;
  data: TData;
  options?: TOptions;
}

export type TaskResultStatus =
  | 'CANCELED'
  | 'COMPLETE'
  | 'FAILED'
  | 'OVERWRITE_PREVENTED';

export interface TaskResult<TStatus, TValue> {
  /**
   * result error (if any)
   */
  error?: Error;

  /**
   * result message (if any)
   */
  message?: string;

  /**
   * task result status
   */
  status: TStatus;

  /**
   * task result value (if any)
   */
  value?: TValue;
}

export interface TaskHandlerOutput<K = any> {
  cancel?: () => void;
  result: Promise<TaskResult<TaskResultStatus, K>>;
}

export type TaskHandler<T = any, K = any> = (input: T) => K;

export interface ListHandlerOptions<T = never> {
  exclude?: T;
  nextToken?: string;
  pageSize?: number;
}

export interface ListHandlerInput<T = any> extends ActionInput<T> {}

export interface ListHandlerOutput<T = any> {
  nextToken: string | undefined;
  items: T[];
}

export type ListHandler<T = any, K = any> = (input: T) => Promise<K>;

export interface ListLocationsExcludeOptions {
  exactPermissions?: LocationPermissions;
  type?: LocationType | LocationType[];
}
/*
extensions (jpg, xml, txt) / or / mimetype application/json image/png > category: text, image, video

handlers take category (text, image, video) - pick a renderer (JSX) and render in preview.

 */

/*

1. click on row

2. fetching the type + what customer want 

3. Generate URL (with user passed config)

<StorageBrowser 

 extraMimeTypes={{
    video: ['application/mpeg5'],
    pdf: ['application/pdf'],
    code: ["application/json"]
  }}
  
/>


cat.jpg.v3

*/

/*
  <StorageBrowser.ObjectDetailsView.Preview
           extraHandlers={{
             text: (mime, content) => <textarea value={content}>,
.            code: (mime, content) => {
 @import hl from ace
 @import Component from ace-dom;
.                return <Component value={hl(content, { type: mime })} />
           }} />

{renderer = extraHandlers[type] ?? defaulthandler[type]}

 {renderer('text/text', 'Hello Osama')}

/*

Yes, we should allow customers to add their own file validation. This would be useful for scenarios where:

Organizations have custom file formats
Security policies restrict certain file types
Applications need domain-specific file handling
Here's how it could look:

Option 1: Simple Allow/Block Lists
<StorageBrowser 
  fileValidation={{
    allowedExtensions: ['jpg', 'png', 'pdf', 'jsonx', 'customformat'],
    blockedExtensions: ['exe', 'bat', 'sh'],
    allowedMimeTypes: ['image/*', 'application/pdf', 'application/custom-json'],
    blockedMimeTypes: ['application/x-executable']
  }}
/>
Option 2: Custom Validation Function
<StorageBrowser 
  fileValidation={(file) => {
    const { name, type, size } = file;
    const extension = name.split('.').pop()?.toLowerCase();
    
    // Custom business logic
    if (extension === 'jsonx' && type === 'application/json') {
      return { isValid: true, category: 'text' };
    }
    
    if (size > 100 * 1024 * 1024) { // 100MB limit
      return { isValid: false, reason: 'File too large' };
    }
    
    // Security check for custom formats
    if (extension === 'myformat' && !isValidMyFormat(file)) {
      return { isValid: false, reason: 'Invalid custom format' };
    }
    
    return { isValid: true, category: 'unknown' };
  }}
/>
Option 3: Combined Approach
<StorageBrowser 
  fileValidation={{
    // Simple rules first
    allowedExtensions: ['jpg', 'png', 'pdf', 'jsonx'],
    maxFileSize: 50 * 1024 * 1024, // 50MB
    
    // Custom validator for complex cases
    customValidator: (file) => {
      if (file.name.endsWith('.jsonx')) {
        return validateJsonXFormat(file);
      }
      return { isValid: true };
    },
    
    // Error messages
    messages: {
      invalidExtension: 'File type not supported',
      fileTooLarge: 'File exceeds maximum size limit',
      customError: 'File format validation failed'
    }
  }}
/>
Benefits:
Security: Organizations can enforce file type policies
Performance: Prevent processing of unsupported large files
Flexibility: Handle custom formats and business rules
User Experience: Clear error messages for invalid files
Use Cases:
Medical systems validating DICOM files
Legal firms restricting to specific document types
Media companies with custom video formats
Financial institutions with compliance requirements
The combined approach (Option 3) would be most flexible, allowing simple configuration for common cases while supporting complex validation logic when needed.


*/

/*


Specific Preview

Handler Signature:
type PreviewHandler = (props: {
  fileData: FileData; // Contains file name, size, type, etc.
  content?: string; // File content for text-based files
  url?: string; // Pre-signed URL for other file types
}) => React.ReactNode;
Handler Types: Handlers should be typed functions that return a React node (JSX).

Default Handlers: Since the library already handles images, text, and video, we won't export these handlers. Users can override them through the handlers prop.

Handler Validation: We can enforce a strict mapping by defining a set of allowed handler keys (e.g., 'text', 'video', 'image', 'audio', 'pdf', 'code', 'unknown'). Users can only provide handlers for these keys.

const ALLOWED_HANDLER_KEYS = ['text', 'video', 'image', 'audio', 'pdf', 'code', 'unknown'] as const;
type HandlerKey = typeof ALLOWED_HANDLER_KEYS[number];

interface PreviewHandlers {
  [key: string]: PreviewHandler;
}

<StorageBrowser.ObjectDetailsView.Preview
  handlers={{
    text: (props) => <textarea value={props.content} />,
    video: (props) => <video src={props.url} controls />,
    // ... other handlers
  }}
/>
Fallback Behavior: If a user doesn't provide a handler for a specific file type, we'll use the default handlers. If no default handler is available, we can fallback to a download link or a "Preview not available" message.

*/

/*


*/
