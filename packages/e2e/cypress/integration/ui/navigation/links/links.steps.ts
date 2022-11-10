import { Then } from '@badeball/cypress-cucumber-preprocessor';
import sitemapUrls from 'sitemap-urls';

Then('I see there are {int} pages', function (numberOfPages: number) {
  cy.request('sitemap.xml').then(async (response) => {
    const sitemapLinks: string[] = await sitemapUrls.extractUrls(response.body);
    expect(sitemapLinks.length).to.eq(numberOfPages);
  });
});
