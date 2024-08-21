import { DisplayTextTemplate } from '@aws-amplify/ui';
export type ConversationDisplayText = {
    conversationHeaderText?: string;
};
export declare const defaultAIConversationDisplayText: Required<AIConversationDisplayText>;
export type AIConversationDisplayText = DisplayTextTemplate<ConversationDisplayText>;
