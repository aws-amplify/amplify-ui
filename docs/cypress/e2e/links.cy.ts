import sitemapUrls from 'sitemap-urls';

let allSitemapLinksLocal: string[] = [];
let allSitemapLinksDev: string[] = [];
describe('Links', () => {
  before(() => {
    cy.task('readSitemapLinks').then((links: string[]) => {
      allSitemapLinksLocal = allSitemapLinksLocal.concat(links);
    });
    cy.request('https://dev.ui.docs.amplify.aws/sitemap.xml').then(
      async (siteMapContent) => {
        allSitemapLinksDev = await sitemapUrls.extractUrls(siteMapContent.body);
      }
    );
  });

  it('should be 119 links on Sitemap', () => {
    expect(allSitemapLinksLocal.length).to.eq(119);
  });
});

for (let i = 0; i < 119; i++) {
  describe(`check page ${i}`, () => {
    const baseUrlLocal = 'http://localhost:5001';
    const baseUrlDev = 'https://dev.ui.docs.amplify.aws';

    it(`all links on page ${allSitemapLinksLocal[i]} should work`, () => {
      const linkLocal = allSitemapLinksLocal[i];
      const linkDev = linkLocal.replace(baseUrlLocal, baseUrlDev);
      if (allSitemapLinksDev.includes(linkDev)) {
        cy.task('log', `[TESTING...] page ${linkDev}`);
        cy.request(linkDev || '/').then(({ status }) => {
          expect(status).to.eq(200);
          cy.clearLocalStorage();
        });
      } else {
        cy.task('log', `[TESTING...] page ${linkLocal}`);
        cy.request(linkLocal || '/').then(({ status }) => {
          expect(status).to.eq(200);
          cy.clearLocalStorage();
        });
      }
      // cy.get('a').each(hrefWorks);
      // cy.get('button').each(hrefWorks);

      function hrefWorks(htmlTag: JQuery<HTMLElement>): void {
        const tagHref = htmlTag.prop('href');
        const tagText = htmlTag.prop('text');
        const tagName = htmlTag.prop('tagName');
        if (tagHref) {
          cy.task(
            'log',
            `[REQUESTING...] ${tagHref} from ${tagName} tag ${
              tagText ? `"${tagText}"` : ''
            } on ${baseUrlLocal}/${linkLocal}`
          );

          if (allSitemapLinksLocal.includes(`${baseUrlLocal}${tagHref}`)) {
            expect(allSitemapLinksLocal).has(`${baseUrlLocal}${tagHref}`);
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
            } on ${baseUrlLocal}/${linkLocal} doesn't have a href attribute`
          );
        }
      }
    });
  });
}

export {};
