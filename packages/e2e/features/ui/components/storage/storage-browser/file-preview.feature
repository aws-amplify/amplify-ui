Feature: File Preview with Storage Browser

  Background:
    Given I'm running the example "ui/components/storage/storage-browser/default-auth"
    And I type my "email" with status "CONFIRMED"
    And I type my password
    And I click the "Sign in" button

  @react
  Scenario: Open and close file preview for text file
    When I click the first button containing "public"
    When I click the button with label "001_dont_delete_text_file_preview_end_to_end_testing.txt file"
    Then I see "File Preview"
    Then I see "File Information"
    Then I see the "This is the text file content." message
    When I click the "Close" button
    Then I do not see "File Preview"

  @react
  Scenario: Open and close file preview for image file
    When I click the first button containing "public"
    When I click the button with label "001_dont_delete_image_file_preview_end_to_end_testing.jpg file"
    Then I see "File Preview"
    Then I see "File Information"
    Then I see the "Image preview for 001_dont_delete_image_file_preview_end_to_end_testing.jpg" image
    When I click the "Close" button
    Then I do not see "File Preview"

  @react
  Scenario: Open and close file preview for video file
    When I click the first button containing "public"
    When I click the button with label "001_dont_delete_video_file_preview_end_to_end_testing.mp4 file"
    Then I see "File Preview"
    Then I see "File Information"
    Then I see video with label "Video preview for 001_dont_delete_video_file_preview_end_to_end_testing.mp4"
    When I click the "Close" button
    Then I do not see "File Preview"

  @react
  Scenario: Open and close file preview for unsupported file
    When I click the first button containing "public"
    When I click the button with label "001_dont_delete_un_supported_file_preview_end_to_end_testing.pdf file"
    Then I see "File Preview"
    Then I see "File Information"
    Then I see "File preview not supported for this file type"
    Then I click the download button with label "Download 001_dont_delete_un_supported_file_preview_end_to_end_testing.pdf file" and see the file downloaded
    When I click the "Close" button
    Then I do not see "File Preview"

  @react
  Scenario: File preview shows size limit exceeded message for large files
    When I click the first button containing "public"
    When I click the button with label "001_dont_delete_text_file_preview_limit_exceeded_end_to_end_testing.json file"
    Then I see "File Preview"
    Then I see "File Information"
    Then I see "File preview not possible due to preview size limit"
    Then I click the download button with label "Download 001_dont_delete_text_file_preview_limit_exceeded_end_to_end_testing.json file" and see the file downloaded
    When I click the "Close" button
    Then I do not see "File Preview"

  @react
  Scenario: File preview shows error and retry functionality on network failure
    When I click the first button containing "public"
    When I click the button with label "001_dont_delete_text_file_preview_end_to_end_testing.txt file"
    When A network failure occurs
    Then I see "File Preview"
    Then I see "File Information"
    Then I see an error message for network failure
    When I click the button with label "Retry loading 001_dont_delete_text_file_preview_end_to_end_testing.txt file"
    Then I see the File preview Loader
    When I click the "Close" button
    Then I do not see "File Preview"
