describe('Links on Sitemap', () => {
  it('should be 118 pages. Links on each page should all return 200', async () => {
    cy.task('readSitemapLinks').then((links: string[]) => {
      expect(links.length).to.eq(119);
      links.forEach((link) => {
        cy.visit(link ?? '/');
        cy.get('a').each((anchor) => {
          cy.request(anchor.prop('href')).then(({ status }) => {
            expect(status).to.eq(200);
          });
        });
        cy.get('button').each((button) => {
          cy.request(button.prop('href')).then(({ status }) => {
            expect(status).to.eq(200);
          });
        });
      });
    });
  });
});

export {};
