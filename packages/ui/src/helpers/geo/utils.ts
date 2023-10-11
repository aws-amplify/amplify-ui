import {
  Category,
  GeoAction,
  SetCustomUserAgentInput,
} from '@aws-amplify/core/internals/utils';

export const geoDataPlaneState: SetCustomUserAgentInput = {
  category: Category.Geo,
  apis: [GeoAction.None],
  additionalDetails: [['component', 'geo']],
};
