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
        const tagHref = htmlTag.prop('href');
        const tagText = htmlTag.prop('text');
        const tagName = htmlTag.prop('tagName');
        if (tagHref) {
          cy.task(
            'log',
            `🔍[CHECKING...] ${tagHref} from ${tagName} tag ${
              tagText ? `"${tagText}"` : ''
            } on ${baseUrl}/${link}`
          );

          if (allLinks.includes(`${baseUrl}${tagHref}`)) {
            expect(allLinks).has(`${baseUrl}${tagHref}`);
            cy.task(
              'log',
              `⏭[SKIPPING...] ${tagHref} from ${tagName} tag ${
                tagText ? `"${tagText}"` : ''
              } on ${baseUrl}/${link} because it's included in Sitemap and already tested.`
            );
          } else {
            cy.task(
              'log',
              `📞[REQUESTING...] ${tagHref} from ${tagName} tag ${
                tagText ? `"${tagText}"` : ''
              } on ${baseUrl}/${link}`
            );
            cy.request({ url: tagHref, followRedirect: false }).then(
              ({ status }) => {
                expect(status).to.oneOf([200, 301]);
              }
            );
          }
        } else if (tagName === 'A') {
          cy.task(
            'log',
            `⚠ ${tagName} tag ${
              tagText ? `"${tagText}"` : ''
            } on ${baseUrl}/${link} doesn't have a href attribute`
          );
        }
      }
    });
  });
}

export {};
