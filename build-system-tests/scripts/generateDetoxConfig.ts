import fs from 'fs';
import * as path from 'path';

import { Command } from 'commander';

const program = new Command();

/**
 * Example usage:
 * $ node --require esbuild-register ./scripts/generateDetoxConfig.ts --mega-app-name rnlatestclilatesttsios
 */
program
  .option('-n, --mega-app-name <megaAppName>', 'Specify the mega app name')
  .option('-n, --build-tool <buildTool>', 'Specify the build tool')
  .option('-n, --platform <platform>', 'Specify the platform')
  .parse(process.argv);

program.parse();

const { megaAppName, buildTool = 'cli' } = program.opts();

if (!megaAppName) {
  console.error('Error: MEGA_APP_NAME parameter is missing.');
  process.exit(1);
}

// Define the Detox configuration with the dynamic name
const detoxConfig = {
  skipLegacyWorkersInjection: true,
  artifacts: {
    rootDir: './detox/screenshots',
    plugins: {
      screenshot: {
        enabled: true,
        shouldTakeAutomaticSnapshots: true,
        keepOnlyFailedTestsArtifacts: true,
        takeWhen: {
          testStart: false,
          testDone: true,
          appNotReady: true,
        },
      },
    },
  },
  apps: {
    'ios.debug': {
      type: 'ios.app',
      binaryPath: `../mega-apps/${megaAppName}/ios/build/Build/Products/Debug-iphonesimulator/ReactNative.app`,
      build: `xcodebuild -quiet -workspace ../examples/${megaAppName}/ios/ReactNative.xcworkspace -scheme ReactNative -configuration Debug -sdk iphonesimulator -arch x86_64 -derivedDataPath ../mega-apps/${megaAppName}/ios/build`,
    },
    'android.debug': {
      type: 'android.apk',
      binaryPath: `../mega-apps/${megaAppName}/android/app/build/outputs/apk/debug/app-debug.apk`,
      build: `cd ../mega-apps/${megaAppName}/android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ../../..`,
      reversePorts: [9091],
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_5_API_27',
      },
      headless: true,
    },
  },
  configurations: {
    'ios.simulator.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'android.emulator.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};

// Write the JSON file to .detoxrc.json
const outputPath = path.join(__dirname, '../e2e/.detoxrc.json');
fs.writeFileSync(outputPath, JSON.stringify(detoxConfig, null, 2));

console.log(`.detoxrc.json generated successfully for project ${megaAppName}`);
