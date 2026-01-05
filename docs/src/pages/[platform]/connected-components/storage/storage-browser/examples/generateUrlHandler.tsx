import { ActionHandler } from '@aws-amplify/ui-react-storage/browser';
import { TaskResult } from '@aws-amplify/ui-react-storage/dist/types/components/StorageBrowser/actions';

type DeleteHandler = ActionHandler<{ path: string }, {}>;

export const customDeleteHandler: DeleteHandler = ({ data, options }) => {
  const asyncExecution = async () => {
    try {
      const totalItems = 100;
      let processedItems = 0;
      let failedItems = 0;
      const failures = [];

      // Simulate batch processing
      for (let batch = 0; batch < 10; batch++) {
        // Process batch of 10 items
        const batchSize = 10;
        const batchSuccess = Math.random() > 0.1 ? batchSize : batchSize - 1;
        const batchFailed = batchSize - batchSuccess;

        processedItems += batchSuccess;
        failedItems += batchFailed;

        // Report progress after each batch
        options?.onProgress?.(
          { key: data.key, id: data.id },
          {
            progress: processedItems / totalItems,
            successCount: processedItems,
            failCount: failedItems,
          }
        );

        // Simulate delete operation
        await new Promise((resolve) => setTimeout(resolve, 100)).catch(() => {
          failures.push(new Error('Simulated processing error'));
        });
      }

      const result: TaskResult<any, any> = {
        status: 'COMPLETE' as const,
        value: {},
        successCount: processedItems,
        failCount: failedItems,
        failures: [],
      };
      return result;
    } catch (error) {
      const message = 'Unable to delete the folder';
      return {
        status: 'FAILED' as const,
        message,
        error,
      };
    }
  };

  return { result: asyncExecution() };
};
