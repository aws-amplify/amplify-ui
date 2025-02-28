import {
  convertBufferToBase64,
  formatDate,
  getAttachmentFormat,
  attachmentsValidator,
  getValidDocumentName,
} from '../utils';

describe('convertBufferToBase64', () => {
  it('should convert an ArrayBuffer to a base64 string with the correct format', () => {
    const { buffer } = new Uint8Array([72, 101, 108, 108, 111]);
    const format = 'png';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/png;base64,SGVsbG8=');
  });

  it('should handle empty buffers correctly', () => {
    const buffer = new ArrayBuffer(0);
    const format = 'jpeg';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/jpeg;base64,');
  });

  it('should convert an ArrayBuffer with different content correctly', () => {
    const { buffer } = new Uint8Array([255, 0, 255, 0]);
    const format = 'gif';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/gif;base64,/wD/AA==');
  });

  it('should still work in node based Buffer is not defined', () => {
    (window.Buffer as any) = undefined;
    const { buffer } = new Uint8Array([72, 101, 108, 108, 111]);
    const format = 'png';
    const base64String = convertBufferToBase64(buffer, format);
    expect(base64String).toBe('data:image/png;base64,SGVsbG8=');
  });
});

describe('formatDate', () => {
  it('should format the date correctly', () => {
    const date = new Date('2024-07-15T15:23:00');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Mon, Jul 15 at 3:23 PM');
  });

  it('should handle different dates and times correctly', () => {
    const date = new Date('1999-08-20T03:10:59');
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe('Fri, Aug 20 at 3:10 AM');
  });
});

describe('getValidDocumentName', () => {
  it('should remove invalid characters from the file name', () => {
    const file = new File([''], 'test!@#$%^&*()+-.txt');
    const validName = getValidDocumentName(file);
    expect(validName).toBe('test');
  });

  it('should handle files with multiple dots correctly', () => {
    const file = new File([''], 'test..txt');
    const validName = getValidDocumentName(file);
    expect(validName).toBe('test');
  });
});

describe('getAttachmentFormat', () => {
  it('should get format from the extension', () => {
    const file = new File([''], 'test.docx', {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });
    const format = getAttachmentFormat(file);
    expect(format).toBe('docx');
  });

  it('should get the format from mimetype if there is no extension', () => {
    const file = new File([''], 'test', { type: 'image/png' });
    const format = getAttachmentFormat(file);
    expect(format).toBe('png');
  });
});

describe('attachmentsValidator', () => {
  // Helper function to create mock files
  const createMockFile = (size: number, name = 'test.txt'): File => {
    const buffer = new ArrayBuffer(size);
    File.prototype.arrayBuffer = jest.fn().mockResolvedValueOnce(buffer);
    return new File([buffer], name, { type: 'text/plain' });
  };

  it('should accept files within size limit', async () => {
    const files = [createMockFile(100)];
    const result = await attachmentsValidator({
      files,
      maxAttachments: 3,
      maxAttachmentSize: 1000,
    });

    expect(result.acceptedFiles).toHaveLength(1);
    expect(result.rejectedFiles).toHaveLength(0);
    expect(result.hasMaxAttachmentSizeError).toBeFalsy();
    expect(result.hasMaxAttachmentsError).toBeFalsy();
  });

  it('should reject files exceeding size limit', async () => {
    const files = [createMockFile(2000)];
    const result = await attachmentsValidator({
      files,
      maxAttachments: 3,
      maxAttachmentSize: 1000,
    });

    expect(result.acceptedFiles).toHaveLength(0);
    expect(result.rejectedFiles).toHaveLength(1);
    expect(result.hasMaxAttachmentSizeError).toBeTruthy();
    expect(result.hasMaxAttachmentsError).toBeFalsy();
  });

  it('should handle mixed valid and invalid file sizes', async () => {
    const files = [
      createMockFile(500),
      createMockFile(2000),
      createMockFile(800),
    ];
    const result = await attachmentsValidator({
      files,
      maxAttachments: 3,
      maxAttachmentSize: 1000,
    });

    expect(result.acceptedFiles).toHaveLength(2);
    expect(result.rejectedFiles).toHaveLength(1);
    expect(result.hasMaxAttachmentSizeError).toBeTruthy();
    expect(result.hasMaxAttachmentsError).toBeFalsy();
  });

  it('should enforce maximum number of attachments', async () => {
    const files = [
      createMockFile(100),
      createMockFile(200),
      createMockFile(300),
      createMockFile(400),
    ];
    const result = await attachmentsValidator({
      files,
      maxAttachments: 2,
      maxAttachmentSize: 1000,
    });

    expect(result.acceptedFiles).toHaveLength(2);
    expect(result.rejectedFiles).toHaveLength(2);
    expect(result.hasMaxAttachmentsError).toBeTruthy();
    expect(result.hasMaxAttachmentSizeError).toBeFalsy();
  });

  it('should handle empty file list', async () => {
    const files: File[] = [];
    const result = await attachmentsValidator({
      files,
      maxAttachments: 3,
      maxAttachmentSize: 1000,
    });

    expect(result.acceptedFiles).toHaveLength(0);
    expect(result.rejectedFiles).toHaveLength(0);
    expect(result.hasMaxAttachmentSizeError).toBeFalsy();
    expect(result.hasMaxAttachmentsError).toBeFalsy();
  });
});
