import { ActionHandler } from '@aws-amplify/ui-react-storage/browser';
import { TaskResult } from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser/actions';

type GenerateLink = ActionHandler<
  { duration: number; fileKey: string },
  { link: string }
>;

export const generateUrlHandler: GenerateLink = ({ data, options }) => {
  const asyncExecution = async () => {
    try {
      const totalItems = 100;
      let processedItems = 0;
      let failedItems = 0;
      const failures: Error[] = [];

      // Simulate batch processing
      for (let batch = 0; batch < 10; batch++) {
        const batchSize = 10;
        
        // Simulate some failures
        const batchSuccess = Math.random() > 0.1 ? batchSize : batchSize - 1;
        const batchFailed = batchSize - batchSuccess;

        processedItems += batchSuccess;
        failedItems += batchFailed;

        // Collect failures
        if (batchFailed > 0) {
          failures.push(new Error(`Batch ${batch}: Failed to process ${batchFailed} items`));
        }

        // NEW: Action-agnostic progress callback with all fields
        options?.onProgress?.(
          { key: data.key, id: data.id }, 
          { 
            progress: processedItems / totalItems,
            successCount: processedItems,
            failCount: failedItems
          }
        );

        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const result: TaskResult<any, any> = {
        status: 'COMPLETE' as const,
        value: {
          link: URL.createObjectURL(new Blob([`mock file for ${data.key}`])),
        },
        successCount: processedItems,  // NEW: Track successful operations
        failCount: failedItems,        // NEW: Track failed operations
        failures: failures,           // NEW: List of individual failures
      };
      return result;
    } catch (error) {
      const message = 'Unable to generate link';
      return {
        status: 'FAILED' as const,
        message,
        error,
        successCount: 0,
        failCount: 1,
        failures: [error as Error],
      };
    }
  };

  return { result: asyncExecution() };
};
