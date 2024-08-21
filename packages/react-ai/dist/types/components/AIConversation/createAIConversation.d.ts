import { AIConversationInput, AIConversation } from './types';
import { AIConversationElements } from './context/elements';
export declare function createAIConversation<T extends Partial<AIConversationElements>>(input?: AIConversationInput<T>): {
    AIConversation: AIConversation<T>;
};
