import { UseAIGenerationHook } from './useAIGeneration';
import { UseAIConversationHook } from './useAIConversation';
export declare function createAIHooks<T extends Record<'generations' | 'conversations', Record<string, any>>>(_client: T): {
    useAIConversation: UseAIConversationHook<Extract<keyof T['conversations'], string>>;
    useAIGeneration: UseAIGenerationHook<Extract<keyof T['generations'], string>>;
};
