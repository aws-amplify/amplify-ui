import {
  ListLocations,
  ListLocationsOutput,
  ListLocationItemsHandler,
  ListLocationItemsHandlerOutput,
  LocationData,
  LocationItemData,
} from '@aws-amplify/ui-react-storage/browser';

import { LocationItems } from './types';
import { generateString, generateNumber, maybe } from './utils';

export type Locations = Record<string, ListLocationsOutput>;

const DELIMITER = '/';

const generateKey = () => {
  const keyLength = generateNumber(2);
  return generateString(keyLength < 20 ? keyLength : 20);
};

const generatePrefix = () => {
  let length = generateNumber(1);

  if (length > 3) length = 3;

  return new Array(length)
    .fill('')
    .reduce((acc) => `${acc}${generateKey()}${DELIMITER}`, '');
};
const PERMISSIONS: LocationData['permissions'] = [
  'delete',
  'get',
  'list',
  'write',
];

const generateLocationData = (
  bucket: string,
  permissions = PERMISSIONS
): LocationData => {
  const [type, prefix]: [LocationData['type'], string] = maybe()
    ? ['BUCKET', '']
    : maybe()
    ? ['OBJECT', `${generatePrefix()}${generateKey()}`]
    : ['PREFIX', generatePrefix()];

  return {
    bucket,
    id: crypto.randomUUID(),
    permissions,
    prefix,
    type,
  };
};

const generateLocatoonItemData = (prefix?: string): LocationItemData => {
  const key = `${prefix ? prefix : ''}${generateString()}`;
  const id = crypto.randomUUID();
  const type = Math.random() > 0.5 ? 'FOLDER' : 'FILE';

  return type === 'FOLDER'
    ? { key, id, type }
    : { key, id, type, lastModified: new Date(), size: generateNumber(4) };
};

export default class LocationsStore {
  #locations: Locations | undefined;
  #locationItems: Record<
    string,
    Record<string, ListLocationItemsHandlerOutput>
  > = {};
  #path: string | undefined;

  get locations() {
    return this.#locations;
  }

  readonly #generateLocations = async (pageSize = 100): Promise<Locations> => {
    const size = generateNumber(1);

    const tokens = new Array(size).fill(null).map(() => generateString());

    return Promise.resolve(
      tokens.reduce(
        (acc, token, index, _tokens) => ({
          ...acc,
          [token]: {
            items: new Array(
              index < _tokens.length - 1 ? pageSize : generateNumber(1)
            )
              .fill(null)
              .map(() => generateLocationData(generateString())),
            nextToken: _tokens[index + 1],
          },
        }),
        {} as Locations
      )
    );
  };

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

  readonly listLocations: ListLocations = async ({ options }) => {
    const { nextToken } = options ?? {};

    if (!this.#locations) {
      this.#locations = await this.#generateLocations();
    }

    return this.#locations[
      nextToken ? nextToken : Object.keys(this.#locations)[0]
    ];
  };

  listLocationItems: ListLocationItemsHandler = async ({
    config,
    prefix,
    options,
  }) => {
    const path = `${config.bucket}${DELIMITER}${prefix}`;
    const { nextToken } = options ?? {};

    let locationPathItems = this.#locationItems?.[path];

    if (!locationPathItems) {
      this.#locationItems[path] = await this.#generateLocationItems({ prefix });
      locationPathItems = this.#locationItems[path];
    }

    return locationPathItems[
      nextToken ? nextToken : Object.keys(locationPathItems)[0]
    ];
  };
}
