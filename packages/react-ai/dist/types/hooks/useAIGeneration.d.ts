import { DataState } from '@aws-amplify/ui-react-core';
interface GenerateParameters {
    arguments: string | string[] | number;
}
interface UseAIGenerationInput {
    onError?: (error: Error) => void;
}
interface AIGenerationState {
    result?: string;
}
export type UseAIGenerationHook<T extends string> = (routeName: T, input?: UseAIGenerationInput) => [
    Awaited<DataState<AIGenerationState>>,
    (input: GenerateParameters) => void
];
export declare function createUseAIGeneration<T extends Record<'generations', Record<string, any>>>(_client: T): UseAIGenerationHook<Extract<keyof T['generations'], string>>;
export {};
