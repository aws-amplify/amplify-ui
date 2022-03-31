import { ModelInit, MutableModel } from '@aws-amplify/datastore';

type HomeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
};

export declare class Home {
  readonly id: string;
  readonly address?: string | null;
  readonly image_url?: string | null;
  readonly price?: number | null;
  readonly Rating?: number | null;
  readonly isAvailable?: boolean | null;
  readonly availabilityDateTime?: string | null;
  readonly availabilityDate?: string | null;
  readonly availabliltyTime?: string | null;
  readonly randomJSON?: string | null;
  readonly timestamp?: number | null;
  readonly phone?: string | null;
  readonly ipAddress?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Home, HomeMetaData>);
  static copyOf(
    source: Home,
    mutator: (
      draft: MutableModel<Home, HomeMetaData>
    ) => MutableModel<Home, HomeMetaData> | void
  ): Home;
}
