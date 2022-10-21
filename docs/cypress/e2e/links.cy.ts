describe('Links', () => {
  const baseUrl = 'http://localhost:5001';
  let allLinks = [];

  before(() => {
    cy.task('readSitemapLinks').then((links: string[]) => {
      allLinks = allLinks.concat(links);
    });
  });

  it('should be 119 pages on Sitemap and all of them should return status 200', () => {
    expect(allLinks.length).to.eq(119);
    cy.wrap(allLinks).each((link: string) => {
      cy.task('log', `[TESTING...] page ${baseUrl}/${link}`);
      cy.request(link ? link : '/').then(({ status }) => {
        expect(status).to.eq(200);
      });
      // cy.visit(link ?? '/');
      // cy.get('a').each(hrefWorks);
      // cy.get('button').each(hrefWorks);

      // function hrefWorks(htmlTag: JQuery<HTMLElement>): void {
      //   const tagHref = htmlTag.prop('href');
      //   const tagText = htmlTag.prop('text');
      //   const tagName = htmlTag.prop('tagName');
      //   if (tagHref) {
      //     cy.task(
      //       'log',
      //       `[REQUESTING...] ${tagHref} from ${tagName} "${tagText}" on ${baseUrl}/${link}`
      //     );
      //     cy.request(tagHref).then(({ status }) => {
      //       expect(status).to.eq(200);
      //     });
      //   } else if (tagName === 'A') {
      //     cy.task(
      //       'log',
      //       `⚠ ${tagName} "${tagText}" on ${baseUrl}/${link} doesn't have a href attribute`
      //     );
      //   }
      // }
    });
  });
});

export {};
