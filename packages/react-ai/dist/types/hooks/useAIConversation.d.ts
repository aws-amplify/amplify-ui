import { DataState } from '@aws-amplify/ui-react-core';
import { ConversationMessage, ConversationRoute, SendMessage } from '../types';
interface UseAIConversationInput {
    id?: string;
    onResponse?: (message: ConversationMessage) => void;
}
interface AIConversationState {
    messages: ConversationMessage[];
}
export type UseAIConversationHook<T extends string> = (routeName: T, input?: UseAIConversationInput) => [DataState<AIConversationState>, SendMessage];
export declare function createUseAIConversation<T extends Record<'conversations', Record<string, ConversationRoute>>>(client: T): UseAIConversationHook<Extract<keyof T['conversations'], string>>;
export {};
