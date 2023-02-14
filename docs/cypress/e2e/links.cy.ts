import { VALIDATED_LINKS } from '../data/validatedLinks';
import { REQUEST_GET_LINKS } from '../data/requestGetLinks';
import { BASE_URL } from '../data/constants';
import 'cypress-each';

type EvtName =
  | 'CHECKING'
  | 'SKIPPING_SITEMAP'
  | 'SKIPPING_VALIDATED'
  | 'REQUESTING'
  | 'RETURNING'
  | 'NO_HREF';

describe(`All pages on Sitemap`, () => {
  let allLinks = [];
  const requestedLinks: Set<string> = new Set();

  before(() => {
    cy.request('sitemap.xml').then((response) => {
      allLinks = Cypress.$(response.body)
        .find('loc')
        .toArray()
        .map((el) => el.innerText)
        .map((link) =>
          link
            .replace(`${BASE_URL}/`, '')
            .replace('https://www.dev.ui.docs.amplify.aws/', '')
            .replace('https://ui.docs.amplify.aws/', '')
        );
    });
  });

  it('should successfully load each url in the sitemap', () => {
    allLinks.forEach((link, idx) => {
      cy.task('log', `🧪[TESTING...] page #${idx} ${BASE_URL}/${link}`);
      cy.visit({ url: link || '/', qs: { cypress: true } });

      /** Check all the internal links */
      cy.get(`a[href^='/']`).each((el) => hrefOnSitemap(el, link, allLinks));

      /** Check all the external links */
      cy.get(`a:not([href^='/'])`).each((el) =>
        hrefWorks(el, link, requestedLinks)
      );
    });
  });
});

export {};

function hrefOnSitemap(
  htmlTag: JQuery<HTMLElement>,
  link: string,
  allLinks: string[]
) {
  const tagHref: string = htmlTag.prop('href');
  const tagText: string = htmlTag.prop('text');
  const tagName: string = htmlTag.prop('tagName');
  const tagHash: string = htmlTag.prop('hash');
  const pureHref = tagHref.replace(tagHash, '');
  /**
   * The following logic is to make the list cy.request() to save memory when build in Amplify Hosting.
   */
  if (
    /** pureHref is included in Sitemap, which is already tested by cy.visit(). */
    allLinks.includes(`${pureHref.replace(`${BASE_URL}/`, '')}`)
  ) {
    expect(`${pureHref.replace(`${BASE_URL}/`, '')}`).to.oneOf(allLinks);
    logMessage({
      evtName: 'SKIPPING_SITEMAP',
      link,
      tagHref: pureHref,
      tagName,
      tagText,
    });
  } else {
    /**
     * pureHref is platform neutral, which would be redirected to react by default and return a 308.
     * To prevent the 308, we manually redirect it to react
     */
    expect(`${pureHref.replace(`${BASE_URL}/`, 'react/')}`).to.oneOf(allLinks);
    logMessage({
      evtName: 'SKIPPING_SITEMAP',
      link,
      tagHref: pureHref,
      tagName,
      tagText,
    });
  }
}

function hrefWorks(
  htmlTag: JQuery<HTMLElement>,
  link: string,
  requestedLinks: Set<string>
): void {
  const tagHref: string = htmlTag.prop('href');
  const tagText: string = htmlTag.prop('text');
  const tagName: string = htmlTag.prop('tagName');

  if (tagHref) {
    logMessage({
      evtName: 'CHECKING',
      link,
      tagHref,
      tagName,
      tagText,
    });

    if (
      /** pureHref is listed in the VALIDATED_LINKS list or already requested in the test. */
      VALIDATED_LINKS.includes(tagHref) ||
      VALIDATED_LINKS.includes(`${tagHref.replace(BASE_URL, '')}`) ||
      requestedLinks.has(tagHref)
    ) {
      logMessage({
        evtName: 'SKIPPING_VALIDATED',
        link,
        tagHref,
        tagName,
        tagText,
      });
    } else {
      const requestMethod = REQUEST_GET_LINKS.includes(tagHref)
        ? 'GET'
        : 'HEAD';
      logMessage({
        evtName: 'REQUESTING',
        link,
        tagHref,
        tagName,
        tagText,
      });
      requestedLinks.add(tagHref);
      cy.request({
        url: tagHref,
        followRedirect: false,
        method: requestMethod,
        qs: { cypress: true },
      }).then(({ status }) => {
        logMessage({
          evtName: 'RETURNING',
          link,
          tagHref,
          tagName,
          tagText,
          status,
        });
        expect(status).to.oneOf([200, 301, 303]);
        cy.clearLocalStorage();
      });
    }
  } else if (tagName === 'A') {
    logMessage({
      evtName: 'NO_HREF',
      link,
      tagHref,
      tagName,
      tagText,
    });
  }
}

function logMessage({
  evtName,
  link,
  tagHref,
  status,
  tagName,
  tagText,
}: {
  evtName: EvtName;
  link: string;
  tagHref: string;
  status?: number;
  tagName: string;
  tagText: string;
}) {
  switch (evtName) {
    case 'CHECKING':
      return cy.task(
        'log',
        `🔍[CHECKING...] ${tagHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link}`
      );
    case 'SKIPPING_SITEMAP':
      return cy.task(
        'log',
        `⏭[SKIPPING...] ${tagHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link} because it's included in Sitemap and already tested.`
      );
    case 'SKIPPING_VALIDATED':
      return cy.task(
        'log',
        `⏭[SKIPPING...] ${tagHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link} because it's already validated.`
      );
    case 'REQUESTING':
      return cy.task(
        'log',
        `📞[REQUESTING...] ${tagHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link}`
      );
    case 'RETURNING':
      return cy.task(
        'log',
        `↩️ [RETURNING STATUS...] ${status} for ${tagHref}`
      );
    case 'NO_HREF':
      return cy.task(
        'log',
        `⚠ ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link} doesn't have a href attribute`
      );
    default:
      break;
  }
}
