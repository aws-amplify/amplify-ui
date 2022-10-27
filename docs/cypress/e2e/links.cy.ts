import { VALIDATED_LINKS } from '../data/validatedLinks';
import { REQUEST_GET_LINKS } from '../data/requestGetLinks';

let allLinks: string[] = [];
const numberOfLinks = 119;
const requestedLinks: Set<string> = new Set();

before(() => {
  cy.task('readSitemapLinks').then((links: string[]) => {
    allLinks = allLinks.concat(links);
  });
});

describe('Local Sitemap', () => {
  it('should have 119 links', () => {
    expect(allLinks.length).to.eq(numberOfLinks);
  });
});

for (let i = 0; i < numberOfLinks; i++) {
  describe(`check page ${i}`, () => {
    const baseUrl = 'http://localhost:3000';

    it(`all links on page ${i} should work`, () => {
      const link = allLinks[i];
      cy.task('log', `🧪[TESTING...] page ${baseUrl}/${link}`);
      cy.visit(link || '/');
      cy.get('a').each(hrefWorks);
      cy.get('button').each(hrefWorks);

      function hrefWorks(htmlTag: JQuery<HTMLElement>): void {
        const tagHref: string = htmlTag.prop('href');
        const tagHash: string = htmlTag.prop('hash');
        const tagText: string = htmlTag.prop('text');
        const tagName: string = htmlTag.prop('tagName');
        let pureHref: string;
        if (tagHref) {
          pureHref = tagHref.replace(tagHash, ''); // TODO: add test to validate links with a hash tag.
          logMessage('CHECKING');

          if (allLinks.includes(`${pureHref.replace(`${baseUrl}/`, '')}`)) {
            expect(`${pureHref.replace(`${baseUrl}/`, '')}`).to.oneOf(allLinks);
            logMessage('SKIPPING_SITEMAP');
          } else if (
            allLinks.includes(`${pureHref.replace(`${baseUrl}/`, 'react/')}`)
          ) {
            expect(`${pureHref.replace(`${baseUrl}/`, 'react/')}`).to.oneOf(
              allLinks
            );
            logMessage('SKIPPING_SITEMAP');
          } else if (
            VALIDATED_LINKS.includes(pureHref) ||
            VALIDATED_LINKS.includes(`${pureHref.replace(baseUrl, '')}`) ||
            requestedLinks.has(pureHref)
          ) {
            logMessage('SKIPPING_VALIDATED');
          } else {
            const requestMethod = REQUEST_GET_LINKS.includes(pureHref)
              ? 'GET'
              : 'HEAD';
            logMessage('REQUESTING');
            requestedLinks.add(pureHref);
            cy.request({
              url: pureHref,
              followRedirect: false,
              method: requestMethod,
            }).then(({ status }) => {
              logMessage('RETURNING', status);
              expect(status).to.oneOf([200, 301, 303]);
              cy.clearLocalStorage();
            });
          }
        } else if (tagName === 'A') {
          logMessage('NO_HREF');
        }

        type EvtName =
          | 'CHECKING'
          | 'SKIPPING_SITEMAP'
          | 'SKIPPING_VALIDATED'
          | 'REQUESTING'
          | 'RETURNING'
          | 'NO_HREF';

        function logMessage(evtName: EvtName, status?: number) {
          switch (evtName) {
            case 'CHECKING':
              return cy.task(
                'log',
                `🔍[CHECKING...] ${pureHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link}`
              );
            case 'SKIPPING_SITEMAP':
              return cy.task(
                'log',
                `⏭[SKIPPING...] ${pureHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link} because it's included in Sitemap and already tested.`
              );
            case 'SKIPPING_VALIDATED':
              return cy.task(
                'log',
                `⏭[SKIPPING...] ${pureHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link} because it's already validated.`
              );
            case 'REQUESTING':
              return cy.task(
                'log',
                `📞[REQUESTING...] ${pureHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link}`
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
                } on ${baseUrl}/${link} doesn't have a href attribute`
              );
            default:
              break;
          }
        }
      }
    });
  });
}

export {};
