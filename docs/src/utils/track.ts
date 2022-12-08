// https://github.com/aws-amplify/docs/blob/main/src/utils/track.ts
let configured = false;

declare global {
  interface Window {
    s: any;
    AWSCShortbread: any;
  }
}

export const configure = (): void => {
  if (!configured) {
    if (
      typeof window !== 'undefined' &&
      typeof window.AWSCShortbread !== 'undefined'
    ) {
      window
        .AWSCShortbread({
          domain: '.amplify.aws',
        })
        .checkForCookieConsent();
      if (typeof window.s !== 'undefined') window.s.trackExternalLinks = false;
      configured = true;
    }
  }
};

export enum AnalyticsEventType {
  PAGE_VISIT = 'PAGE_VISIT',
  INTERNAL_LINK_CLICK = 'INTERNAL_LINK_CLICK',
  EXTERNAL_LINK_CLICK = 'EXTERNAL_LINK_CLICK',
  PAGE_DATA_FETCH_EXCEPTION = 'PAGE_DATA_FETCH_EXCEPTION',
}

interface AnalyticsEventPageVisit {
  type: AnalyticsEventType.PAGE_VISIT;
  attributes: {
    url: string;
    previousUrl: string;
    referrer: string;
  };
}

interface AnalyticsEventInternalLinkClick {
  type: AnalyticsEventType.INTERNAL_LINK_CLICK;
  attributes: {
    from: string;
    to: string;
  };
}

interface AnalyticsEventExternalLinkClick {
  type: AnalyticsEventType.EXTERNAL_LINK_CLICK;
  attributes: {
    from: string;
    to: string;
  };
}

interface AnalyticsEventPageDataFetchException {
  type: AnalyticsEventType.PAGE_DATA_FETCH_EXCEPTION;
  attributes: {
    url: string;
    exception: Error;
  };
}

type AnalyticsEvent =
  | AnalyticsEventPageVisit
  | AnalyticsEventInternalLinkClick
  | AnalyticsEventExternalLinkClick
  | AnalyticsEventPageDataFetchException;

export const trackPageVisit = (): void => {
  if (typeof window !== 'undefined' && typeof window.s !== 'undefined') {
    const { s } = window;
    s.pageURL = window.location.href;
    s.t();
  }
};

export const trackPageFetchException = (): void => {
  if (typeof window !== 'undefined' && typeof window.s !== 'undefined') {
    const { s } = window;
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69';
    s.tl(true, 'o', 'page fetch exception');
  }
};

export const trackExternalLink = (hrefTo: string): void => {
  if (typeof window !== 'undefined' && typeof window.s !== 'undefined') {
    const { s } = window;
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69';
    s.tl(true, 'e', hrefTo);
  }
};

export const setSearchQuery = (query: string): void => {
  if (typeof window !== 'undefined' && typeof window.s != 'undefined') {
    const { s } = window;
    s.eVar26 = query;
  }
};

const triggerNoSearchResults = (query: string): void => {
  if (typeof window !== 'undefined' && typeof window.s != 'undefined') {
    const { s } = window;
    const queryBackup: string = s.eVar26;
    const resultCountBackup: number = parseInt(s.eVar27, 10);

    s.eVar26 = query;
    s.eVar27 = '0'; // If it's the number 0, the variable won't be sent
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar26,eVar27,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69,events';
    s.linkTrackEvents = 'event2';
    s.events = 'event2';
    s.tl(true, 'o', 'internal search');

    s.eVar26 = queryBackup;
    s.eVar27 = resultCountBackup.toString();
  }
};

let noResultsTimeout: NodeJS.Timeout;
export const setSearchResultCount = (resultCount: number): void => {
  if (typeof window !== 'undefined' && typeof window.s !== 'undefined') {
    const { s } = window;
    s.eVar27 = resultCount.toString();
    s.events = resultCount === 0 ? 'event1' : 'event2';

    if (resultCount === 0) {
      if (noResultsTimeout) {
        clearTimeout(noResultsTimeout);
      }
      noResultsTimeout = setTimeout(
        triggerNoSearchResults.bind(null, s.eVar26),
        1000
      );
    }
  }
};

export const trackSearchQuery = (
  _input,
  _event,
  suggestion,
  _datasetNumber,
  _context
): void => {
  if (typeof window !== 'undefined' && typeof window.s !== 'undefined') {
    const { s } = window;
    s.linkTrackVars =
      'prop39,prop41,prop50,prop61,prop62,eVar26,eVar27,eVar39,eVar41,eVar50,eVar61,eVar62,eVar69,events';
    s.linkTrackEvents = 'event1';
    s.events = 'event1';
    s.tl(true, 'o', 'internal search');
  }
  window.location.assign(suggestion.url);
};

interface Event {
  name: string;
  type: string;
}

export const track = (event: Event, data?: Record<string, any>) => {
  try {
    const opt = {
      event,
      data,
    };
    globalThis.AWSMA.ready(() => {
      document.dispatchEvent(
        new CustomEvent(globalThis.AWSMA.TRIGGER_EVENT, { detail: opt })
      );
    });
  } catch (error) {
    // don't want to error for analytics events
  }
};

export const trackClick = (name: string, data?: Record<string, unknown>) => {
  track(
    {
      type: 'click',
      name: name,
    },
    data
  );
};

export const trackScroll = (name: string, data?: Record<string, unknown>) => {
  track(
    {
      type: 'scroll',
      name: name,
    },
    data
  );
};

export const trackCopy = (code: string) => {
  trackClick('CopyCode', {
    code,
  });
};
