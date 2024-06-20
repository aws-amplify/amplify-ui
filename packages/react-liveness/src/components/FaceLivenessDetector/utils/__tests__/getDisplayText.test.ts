import { getDisplayText } from '../getDisplayText';

describe('getDisplayText', () => {
  it('should return display texts with custom values', () => {
    const customDisplayText = {
      hintTooCloseText: 'Way too close!',
      cancelLivenessCheckText: 'Cancel verification process',
      startScreenBeginCheckText: 'Verification process',
      cameraNotFoundHeadingText: 'Camera was not found',
      photosensitivyWarningHeadingText: 'Photosensitive Warning',
      photosensitivityWarningInfoText: 'This is some info',
    };

    const {
      streamDisplayText,
      cameraDisplayText,
      hintDisplayText,
      instructionDisplayText,
    } = getDisplayText(customDisplayText);

    expect(hintDisplayText.hintTooCloseText).toBe(
      customDisplayText.hintTooCloseText
    );
    expect(streamDisplayText.cancelLivenessCheckText).toBe(
      customDisplayText.cancelLivenessCheckText
    );
    expect(instructionDisplayText.startScreenBeginCheckText).toBe(
      customDisplayText.startScreenBeginCheckText
    );
    expect(cameraDisplayText.cameraNotFoundHeadingText).toBe(
      customDisplayText.cameraNotFoundHeadingText
    );
    expect(instructionDisplayText.photosensitivityWarningHeadingText).toBe(
      customDisplayText.photosensitivyWarningHeadingText
    );
    expect(instructionDisplayText.photosensitivityWarningInfoText).toBe(
      customDisplayText.photosensitivityWarningInfoText
    );
  });
});
