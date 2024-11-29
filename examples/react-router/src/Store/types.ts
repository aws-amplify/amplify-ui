import {
  ListLocationsOutput,
  ListLocationItemsHandlerOutput,
} from '@aws-amplify/ui-react-storage/browser';

type Token = string;
export type Locations = Record<Token, ListLocationsOutput>;

type Prefix = string;
export type LocationsItems = Record<Prefix, LocationItems>;

export type LocationItems = Record<Token, ListLocationItemsHandlerOutput>;
