import { VALIDATED_LINKS } from '../data/validLinks';

let allLinks: string[] = [];
const numberOfLinks = 119;

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

for (let i = 60; i < 70; i++) {
  describe(`check page ${i}`, () => {
    const baseUrl = 'http://localhost:3000';

    it(`all links on page ${i} should work`, () => {
      const link = allLinks[i];
      cy.task('log', `🧪[TESTING...] page ${baseUrl}/${link}`);
      cy.visit(link || '/');
      cy.get('a').each(hrefWorks);
      cy.get('button').each(hrefWorks);

      function hrefWorks(htmlTag: JQuery<HTMLElement>): void {
        const tagHref = htmlTag.prop('href');
        const tagText = htmlTag.prop('text');
        const tagName = htmlTag.prop('tagName');
        if (tagHref) {
          logMessage('CHECKING');

          if (allLinks.includes(`${tagHref.replace(`${baseUrl}/`, '')}`)) {
            expect(`${tagHref.replace(`${baseUrl}/`, '')}`).to.oneOf(allLinks);
            logMessage('SKIPPING_SITEMAP');
          } else if (
            allLinks.includes(`${tagHref.replace(`${baseUrl}/`, 'react/')}`)
          ) {
            expect(`${tagHref.replace(`${baseUrl}/`, 'react/')}`).to.oneOf(
              allLinks
            );
            logMessage('SKIPPING_SITEMAP');
          } else if (VALIDATED_LINKS.includes(tagHref)) {
            logMessage('SKIPPING_VALIDATED');
          } else {
            logMessage('REQUESTING');
            cy.request({ url: tagHref, followRedirect: false }).then(
              ({ status }) => {
                logMessage('RETURNING', status);
                expect(status).to.oneOf([200, 301]);
              }
            );
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
                `🔍[CHECKING...] ${tagHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link}`
              );
            case 'SKIPPING_SITEMAP':
              return cy.task(
                'log',
                `⏭[SKIPPING...] ${tagHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link} because it's included in Sitemap and already tested.`
              );
            case 'SKIPPING_VALIDATED':
              return cy.task(
                'log',
                `⏭[SKIPPING...] ${tagHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link} because it's already validated.`
              );
            case 'REQUESTING':
              return cy.task(
                'log',
                `📞[REQUESTING...] ${tagHref} from ${tagName} tag ${
                  tagText ? `"${tagText}"` : ''
                } on ${baseUrl}/${link}`
              );
            case 'RETURNING':
              return cy.task(
                'log',
                `[RETURNING STATUS...] ${status} for ${tagHref}`
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
