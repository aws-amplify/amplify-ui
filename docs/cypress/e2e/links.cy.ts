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

  it('should succesfully load each url in the sitemap', () => {
    allLinks.forEach((link, idx) => {
      cy.task('log', `🧪[TESTING...] page #${idx} ${BASE_URL}/${link}`);
      cy.visit(link || '/');
      cy.get(`a:not([href^='/']), a[href*='#']`).each((el) =>
        hrefWorks(el, link, requestedLinks)
      );
    });
  });
});

export {};

function hrefWorks(
  htmlTag: JQuery<HTMLElement>,
  link: string,
  requestedLinks: Set<string>
): void {
  const tagHref: string = htmlTag.prop('href');
  const tagHash: string = htmlTag.prop('hash');
  const tagText: string = htmlTag.prop('text');
  const tagName: string = htmlTag.prop('tagName');
  let pureHref: string;
  if (tagHref) {
    pureHref = tagHref.replace(tagHash, ''); // TODO: add test to validate links with a hash tag.
    logMessage({ evtName: 'CHECKING', link, pureHref, tagName, tagText });

    if (pureHref === `${BASE_URL}/`) return;

    if (
      VALIDATED_LINKS.includes(pureHref) ||
      VALIDATED_LINKS.includes(`${pureHref.replace(BASE_URL, '')}`) ||
      requestedLinks.has(pureHref)
    ) {
      logMessage({
        evtName: 'SKIPPING_VALIDATED',
        link,
        pureHref,
        tagName,
        tagText,
      });
    } else {
      const requestMethod = REQUEST_GET_LINKS.includes(pureHref)
        ? 'GET'
        : 'HEAD';
      logMessage({
        evtName: 'REQUESTING',
        link,
        pureHref,
        tagName,
        tagText,
      });
      requestedLinks.add(pureHref);
      cy.request({
        url: pureHref,
        followRedirect: false,
        method: requestMethod,
      }).then(({ status }) => {
        logMessage({
          evtName: 'RETURNING',
          link,
          pureHref,
          tagName,
          tagText,
          status,
        });
        expect(status).to.oneOf([200, 301, 303]);
        cy.clearLocalStorage();
      });
    }
  } else if (tagName === 'A') {
    logMessage({ evtName: 'NO_HREF', link, pureHref, tagName, tagText });
  }
}

function logMessage({
  evtName,
  link,
  pureHref,
  status,
  tagName,
  tagText,
}: {
  evtName: EvtName;
  link: string;
  pureHref: string;
  status?: number;
  tagName: string;
  tagText: string;
}) {
  switch (evtName) {
    case 'CHECKING':
      return cy.task(
        'log',
        `🔍[CHECKING...] ${pureHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link}`
      );
    case 'SKIPPING_SITEMAP':
      return cy.task(
        'log',
        `⏭[SKIPPING...] ${pureHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link} because it's included in Sitemap and already tested.`
      );
    case 'SKIPPING_VALIDATED':
      return cy.task(
        'log',
        `⏭[SKIPPING...] ${pureHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link} because it's already validated.`
      );
    case 'REQUESTING':
      return cy.task(
        'log',
        `📞[REQUESTING...] ${pureHref} from ${tagName} tag ${
          tagText ? `"${tagText}"` : ''
        } on ${BASE_URL}/${link}`
      );
    case 'RETURNING':
      return cy.task(
        'log',
        `↩️ [RETURNING STATUS...] ${status} for ${pureHref}`
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
