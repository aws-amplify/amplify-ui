import ControlledValue from './controlled-value';
import DefaultValue from './default-value';
import LegacyControlled from './legacy-controlled';
import { PREFIXES, INITIAL_VALUES } from './storage-browser';

const LEGACY_CONTROLLED_VALUE_PAYLOAD = `?location=${encodeURIComponent(
  JSON.stringify(INITIAL_VALUES.locations?.[0])
)}&path=${PREFIXES.nested}`;

const CONTROLLED_VALUE_PAYLOAD = `?value=${encodeURIComponent(
  JSON.stringify({
    location: INITIAL_VALUES.locations?.[0],
    path: `${PREFIXES.nested}`,
  })
)}`;

const DEFAULT_VALUE_PAYLOAD = `/value/${encodeURIComponent(
  JSON.stringify({
    location: INITIAL_VALUES.locations?.[0],
    path: `${PREFIXES.nested}`,
  })
)}`;

const EXAMPLES = [
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
];

export default EXAMPLES;
