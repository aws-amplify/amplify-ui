Feature: Folder & multi-file download on Storage Browser

  # Seeding strategy: file-requiring scenarios mint a UNIQUE fresh folder per run
  # ("I use a unique download test folder") and upload into it. A fresh prefix is
  # empty by construction, so there is no delete step, no 412 overwrite collision,
  # and runs are deterministic even if a prior run was killed. File COUNTS are
  # never hard-coded — scenarios assert dynamically (at least N rows). Single-file
  # scenarios reuse the stable seeded object "public/001_dont_delete_file.txt"
  # (see download.feature); the "enables Download" scenario reuses the persistent
  # seeded folder "DoNotDeleteThisFolder_CanDeleteAllChildren" purely as a
  # selectable folder.
  #
  # No shared Background: the per-file-validation scenario must boot the example
  # with the download service worker DISABLED (its SW zip stream stalls after
  # file 1 in-harness — the stubbed anchor click never navigates, so the stream
  # never drains and only file 1's HEAD fires — whereas the blob path buffers
  # actively and fires all N per-file HEADs), while every other scenario boots
  # the default example. Gherkin runs Background before every scenario and cannot
  # vary per scenario, so the visit + sign-in sequence is inlined per scenario
  # instead (sign-in steps reused verbatim from sign-in.ts).

  @react
  Scenario: Selecting a folder enables the batch Download action
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    When I click the first button containing "public"
    Then I click checkbox for button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    When I click the "Menu Toggle" button
    Then I see the "Download" menuitem

  @react
  Scenario: Opening the download view for a folder lists contents then renders file rows
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    # Self-seed a fresh unique folder with 3 files so download rows exist without
    # a disk fixture; empty by construction means no pre-delete is needed.
    Given I use a unique download test folder
    When I click the first button containing "public"
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload "3" files into the unique download folder
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    # Delay the enumeration LIST (armed before the Download click) so the
    # transient "listing" message is catchable.
    When folder listing is delayed
    When I open the download view for the unique download folder
    Then I see "Listing folder contents…"
    Then the download list has at least "3" file rows

  @react
  Scenario: Folder download is not dispatched until Start is clicked
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    # Self-seed a fresh unique folder with 3 files.
    Given I use a unique download test folder
    When I click the first button containing "public"
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload "3" files into the unique download folder
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    # Arm the HEAD intercept only now, so seeding traffic is never counted.
    When I arm the S3 download validation intercept
    When I open the download view for the unique download folder
    Then the download list has at least "3" file rows
    Then no S3 download validation has fired

  @react
  Scenario: Downloading a folder validates one S3 request per enumerated file and shows success
    # Boots with the download service worker DISABLED (see feature note): the SW
    # zip stream stalls after file 1 in-harness, so only the blob path fires all
    # N per-file HEADs that this scenario asserts.
    Given I'm running the example "ui/components/storage/storage-browser/default-auth" with the download service worker disabled
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    # Self-seed a fresh unique folder with 3 files.
    Given I use a unique download test folder
    When I click the first button containing "public"
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload "3" files into the unique download folder
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    When I open the download view for the unique download folder
    Then the download list has at least "3" file rows
    Then I click Start and every file row validates successfully
    Then I see "All files downloaded."

  @react
  Scenario: Downloading a single file uses the direct route
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    When I click the first button containing "public"
    Then I see download for file "001_dont_delete_file.txt"
    Then I click and see download succeed for "001_dont_delete_file.txt"

  @react
  Scenario: Selecting a folder with no files shows the no-files message
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    # Create a fresh unique folder that is genuinely EMPTY (no upload). The
    # zero-byte prefix marker S3 writes for it is filtered out during
    # enumeration (expandFolderToFiles skips keys ending in '/', utils.ts:207),
    # so an "empty" folder truly yields zero files and the no-files message shows.
    Given I create a unique empty download test folder
    When I open the download view for the unique download folder
    Then I see "The selected folders contain no files to download."

  @react
  Scenario: Removing a file row from the pending download excludes it
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    # Self-seed 3 files so >=2 rows exist (remove one, >=1 remains); count-agnostic.
    Given I use a unique download test folder
    When I click the first button containing "public"
    When I click the "Menu Toggle" button
    When I click the "Upload" menuitem
    When I upload "3" files into the unique download folder
    When I click the "Upload" button
    Then I see "All files uploaded"
    When I click the "Exit" button
    When I open the download view for the unique download folder
    # Requires a folder with at least 2 files; count is not hard-coded.
    Then the download list has at least "2" file rows
    When I remove the first file row from the download list
    Then the download row count decreases by one

  @react
  Scenario: An error while listing folder contents shows the retry message
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    When I click the first button containing "public"
    Then I click checkbox for button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    When a folder listing failure occurs
    When I click the "Menu Toggle" button
    When I click the "Download" menuitem
    Then I see "Failed to list folder contents. Click Download to try again."

  @react
  Scenario: Cancelling during enumeration returns to a non-dispatched state
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button
    When I arm the S3 download validation intercept
    When I click the first button containing "public"
    Then I click checkbox for button containing "DoNotDeleteThisFolder_CanDeleteAllChildren"
    # Delay the enumeration LIST so Cancel is reliably clickable while enumerating.
    When folder listing is delayed
    When I click the "Menu Toggle" button
    When I click the "Download" menuitem
    When I click the "Cancel" button
    Then no S3 download validation has fired
