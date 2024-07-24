export interface ImageContent {
  format: 'png' | 'jpeg' | 'gif' | 'webp';
  bytes: ArrayBuffer;
}

interface ImageContentBlock {
  type: 'image';
  value: ImageContent;
}

export interface TextContent {
  type: 'text';
  value: string;
}

export type Content = ImageContentBlock | TextContent;

export interface ConversationMessage {
  id: string;
  content: Content;
  role: 'user' | 'assistant';
  timestamp: Date;
}
