describe('Links', () => {
  let allLinks = [];

  before(() => {
    cy.task('readSitemapLinks').then((links: string[]) => {
      allLinks = allLinks.concat(links);
    });
  });

  it('should be 119 links on Sitemap', () => {
    expect(allLinks.length).to.eq(119);
  });
});

for (let i = 0; i < 119; i++) {
  describe('check page', () => {
    const baseUrl = 'http://localhost:5001';
    let allLinks = [];

    before(() => {
      cy.task('readSitemapLinks').then((links: string[]) => {
        allLinks = allLinks.concat(links);
      });
    });

    it(`✔️ all links on ${i} link works`, () => {
      const link = allLinks[i];
      cy.task('log', `[TESTING...] page ${baseUrl}/${link}`);
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
            `[REQUESTING...] ${tagHref} from ${tagName} tag ${
              tagText ? `"${tagText}"` : ''
            } on ${baseUrl}/${link}`
          );

          if (allLinks.includes(tagHref)) {
            expect(allLinks).has(tagHref);
          } else {
            cy.request(tagHref).then(({ status }) => {
              expect(status).to.eq(200);
            });
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
