import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import * as React from 'react';

/* This example requires Tailwind CSS v2.0+ */
import { ExclamationIcon } from '@heroicons/react/solid';

export default function Example() {
  return;
}

const placeholders =
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget dapibus libero. Morbi ultricies varius accumsan. Mauris vel odio semper, ultricies diam vel, lacinia nisi. Morbi id volutpat nunc, vitae pharetra augue. Nullam sit amet ante dictum, elementum ligula sit amet, varius lorem. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.`
    .split(' ')
    .slice(0, 20)
    .map((word) => (
      <div className="h-4 text-transparent bg-gray-200 rounded whitespace-nowrap">
        {word}
      </div>
    ));

export const Fragment = ({ children }) => {
  const { query } = useRouter();
  const { platform = 'react' } = query;
  const Component = React.useMemo(() => {
    return dynamic(() => children({ platform }), {
      loading({ error, isLoading }) {
        if (error) {
          return (
            <div className="px-4 py-1 my-6 rounded-md bg-yellow-50">
              <h3 className="text-sm font-medium text-yellow-800">
                {error.message.includes('Cannot find module') ? (
                  <>Missing content for {platform}</>
                ) : (
                  error.message
                )}
              </h3>
            </div>
          );
        }

        return (
          <div className="flex flex-wrap items-end w-full space-x-2 space-y-3 animate-pulse">
            {placeholders}
          </div>
        );
      },
    });
  }, [children, platform]);

  return <Component />;
};
