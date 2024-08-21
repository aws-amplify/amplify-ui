import { useDataState } from '@aws-amplify/ui-react-core';

function createUseAIGeneration(_client) {
    const useAIGeneration = (_routeName, _input) => {
        // return useDataState(client.ai.generation as T['ai'])[routeName].generate, { messages: [] });
        // const generate = client.ai.generate as T['ai'])[routeName];
        // const newAction = async (_prev: { result: string }, _input: GenerateParameters) => {
        //   const result = await generate(_input);
        //   return { result }
        // }
        const updateAIGenerationStateAction = async (_prev, _input) => {
            await new Promise((r) => setTimeout(r, 500));
            return { result: 'generatedresult' };
        };
        return useDataState(updateAIGenerationStateAction, {});
    };
    return useAIGeneration;
}

export { createUseAIGeneration };
