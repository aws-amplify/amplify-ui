describe('Links on Sitemap', () => {
  it('return 200', async () => {
    cy.task('readSitemapLinks').then((links: string[]) => {
      links.forEach((link) => {
        cy.request(link ?? '/').then(({ status }) => {
          expect(status).to.eq(200);
        });
      });
    });
  });
});

export {};
