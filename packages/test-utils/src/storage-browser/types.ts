import type {
  ListLocationItemsHandlerOutput,
  LocationData,
} from '@aws-amplify/ui-react-storage/browser';

export type LocationItems = ListLocationItemsHandlerOutput['items'];

export interface InitialValues {
  locations?: LocationData[];
  locationItems?: Record<string, LocationItems>;
}

export interface MockHandlersInput {
  initialValues?: InitialValues;
}
