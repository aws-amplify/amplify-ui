import {
  ListLocationItemsHandler,
  LocationItemData,
  LocationData,
} from '@aws-amplify/ui-react-storage/browser';
import { LocationItems } from './types';
import { generateString, generateNumber } from './utils';

const generateLocatoonItemData = (prefix?: string): LocationItemData => {
  const key = `${prefix ? prefix : ''}${generateString()}`;
  const id = crypto.randomUUID();
  const type = Math.random() > 0.5 ? 'FOLDER' : 'FILE';

  return type === 'FOLDER'
    ? { key, id, type }
    : { key, id, type, lastModified: new Date(), size: generateNumber(4) };
};

export default class LocationItemsStore {
  #locationItems: LocationItems | undefined;

  readonly #generateLocationItems = async (
    location: Pick<LocationData, 'prefix'>
  ): Promise<LocationItems> => {
    const size = generateNumber(1);
    const tokens = new Array(size).fill(null).map(() => generateString());
    const { prefix } = location;

    return Promise.resolve(
      tokens.reduce(
        (acc, token, index, _tokens) => ({
          ...acc,
          [token]: {
            items: new Array(
              index < _tokens.length - 1 ? 100 : generateNumber(1)
            )
              .fill(null)
              .map(() => generateLocatoonItemData(prefix)),
            nextToken: _tokens[index + 1],
          },
        }),
        {} as LocationItems
      )
    );
  };

  listLocationItems: ListLocationItemsHandler = async ({
    config,
    prefix,
    options,
  }) => {
    const { nextToken } = options ?? {};
    const path = `${config.bucket}/${prefix ?? ''}`;

    if (!this.#locationItems) {
      this.#locationItems = await this.#generateLocationItems({ prefix });
    }

    const locationItems = this.#locationItems[nextToken];

    return Promise.resolve(locationItems);
  };
}
