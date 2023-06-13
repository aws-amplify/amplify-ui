import { VERSION } from '../../../version';

const BASE_USER_AGENT = `ui-react-liveness ${VERSION}`;

export const getLivenessUserAgent = (content?: string): string => {
  return `${BASE_USER_AGENT}${content ? content : ''}`;
};
