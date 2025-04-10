// apps
import Composed from './composed';
import ControlledValue from './controlled-value';
import DefaultValue from './default-value';
import LegacyControlled from './legacy-controlled';
import PropsValidation from './props-validation';

// utils
import { PREFIXES, INITIAL_VALUES } from './storage-browser';

// with `location`, `path` search params (`useSearchParams`)
const LEGACY_CONTROLLED_VALUE_PAYLOAD = `?location=${encodeURIComponent(
  JSON.stringify(INITIAL_VALUES.locations?.[0])
)}&path=${PREFIXES.nested}`;

const ENCODED_VALUE = encodeURIComponent(
  JSON.stringify({
    location: { ...INITIAL_VALUES.locations?.[0], path: PREFIXES.nested },
  })
);

// with value `search` params (`useSearchParams`)
const CONTROLLED_VALUE_PAYLOAD = `?value=${ENCODED_VALUE}`;

// dynamic path params (`useParams`)
const DEFAULT_VALUE_PAYLOAD = `/value/${ENCODED_VALUE}`;

const EXAMPLES = [
  {
    Page: Composed,
    subpath: 'composed',
    title: 'Composed',
  },
  {
    Page: ControlledValue,
    subpath: 'controlled-value',
    params: 'value/:value',
    payload: CONTROLLED_VALUE_PAYLOAD,
    title: 'Controlled Value',
  },
  {
    Page: DefaultValue,
    subpath: 'default-value',
    params: 'value/:value',
    payload: DEFAULT_VALUE_PAYLOAD,
    title: 'Default Value',
  },
  {
    Page: LegacyControlled,
    subpath: 'legacy-controlled',
    params: 'location/:location/path/:path/actionType/:actionType',
    payload: LEGACY_CONTROLLED_VALUE_PAYLOAD,
    title: 'Legacy Controlled',
  },
  {
    Page: PropsValidation,
    subpath: 'props-validation',
    title: 'Props Validation',
  },
];

export default EXAMPLES;
