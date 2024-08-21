import { createUseAIGeneration } from './useAIGeneration.mjs';
import { createUseAIConversation } from './useAIConversation.mjs';

function createAIHooks(_client) {
    const useAIConversation = createUseAIConversation(_client);
    const useAIGeneration = createUseAIGeneration();
    return { useAIConversation, useAIGeneration };
}

export { createAIHooks };
