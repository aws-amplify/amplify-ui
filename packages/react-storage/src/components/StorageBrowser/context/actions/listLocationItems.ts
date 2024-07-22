import { EXTENSIONS } from './constants';
// import { list, List } from 'aws-amplify/storage';

import {
  generateString,
  randomDate,
  randomNumberInRange,
  timeout,
} from './utils';

type LocationItem =
  | {
      key: string;
      lastModified: Date;
      size: number;
      type: 'FILE';
    }
  | {
      key: string;
      type: 'FOLDER';
    };

interface ListLocationItemsActionInput {
  prefix?: string;
  options?:
    | {
        nextToken?: string;
        pageSize?: number;
        refresh?: never;
      }
    | {
        pageSize?: number;
        nextToken?: never;
        refresh?: boolean;
      };
}

interface ListLocationItemsActionOutput {
  items: LocationItem[];
  nextToken: string | undefined;
}

const generateListLocationItemsData = (count: number): LocationItem[] => {
  const items: LocationItem[] = [];

  const startDate = new Date(2012, 0, 1);
  const endDate = new Date();

  while (count > items.length) {
    // bias towards generating FILE over FOLDER
    const type = randomNumberInRange(0, 12) > 8 ? 'FOLDER' : 'FILE';
    const key = `${generateString(randomNumberInRange(6, 23))}${
      type === 'FOLDER'
        ? ''
        : `.${EXTENSIONS[randomNumberInRange(0, EXTENSIONS.length - 1)]}`
    }`;

    items.push({
      key,
      lastModified: randomDate(startDate, endDate),
      size: randomNumberInRange(120, 10000),
      type,
    });
  }

  return items;
};

export default async function listLocationItemsAction(
  prevResult: ListLocationItemsActionOutput,
  input?: ListLocationItemsActionInput
): Promise<ListLocationItemsActionOutput> {
  const { options } = input ?? {};
  const items = generateListLocationItemsData(options?.pageSize ?? 100);
  const nextToken =
    prevResult.items.length < 1000 ? generateString(100) : undefined;

  await timeout(1000);

  return Promise.resolve({ items: [...prevResult.items, ...items], nextToken });
}
