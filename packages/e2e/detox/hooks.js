import { Before, After } from '@cucumber/cucumber';
import detox from 'detox';

Before({ timeout: 120 * 1000 }, async () => {
  await detox.init();
  await device.launchApp();
  await device.reloadReactNative();
});
After({ timeout: 120 * 1000 }, async () => {
  await detox.cleanup();
});
