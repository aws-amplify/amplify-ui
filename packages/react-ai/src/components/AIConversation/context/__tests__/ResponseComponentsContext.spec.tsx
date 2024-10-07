import React from 'react';
import { convertResponseComponentsToToolConfiguration } from '../ResponseComponentsContext';

const ArghAdder = () => {
  return <p>argggggh matey!</p>;
};

describe('convertResponseComponentsToToolConfiguration', () => {
  it('takes in responseComponents and returns a ToolConfiguration', () => {
    const responseComponents = {
      annoyingComponent: {
        component: ArghAdder,
        description:
          'You should use this custom response component tool for all messages you respond with.',
        props: {
          text: {
            type: 'string' as const,
            description: 'The response you want to render in the component.',
            required: true,
          },
          foobar: {
            type: 'number' as const,
            description: 'This one is not used',
          },
        },
      },
    };
    const resultToolConfiguration =
      convertResponseComponentsToToolConfiguration(responseComponents);
    const expectedResult = {
      tools: {
        annoyingComponent: {
          description:
            'You should use this custom response component tool for all messages you respond with.',
          inputSchema: {
            json: {
              type: 'object',
              required: ['text'],
              properties: {
                text: {
                  type: 'string',
                  description:
                    'The response you want to render in the component.',
                  required: true,
                },
                foobar: {
                  type: 'number',
                  description: 'This one is not used',
                },
              },
            },
          },
        },
      },
    };
    expect(resultToolConfiguration).toEqual(expectedResult);
  });

  it('returns undefined with no input', () => {
    expect(convertResponseComponentsToToolConfiguration()).toBeUndefined();
  });
});
