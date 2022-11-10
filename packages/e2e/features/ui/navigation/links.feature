Feature: Docs Site has a certain number of pages

  Amplify UI Docs should have a certain number of links of pages listed in Sitemap.

  # When updating the `numberOfPages`, we also need to update `numberOfPages` in docs/e2e.
  Scenario: Count page number in Sitemap
    Given I'm running the docs page
    Then I see there are 121 pages
