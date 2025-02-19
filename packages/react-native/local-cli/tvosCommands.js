let apple;
try {
  apple = require('@react-native-community/cli-platform-apple');
} catch {
  if (verbose) {
    console.warn(
      '@react-native-community/cli-platform-apple not found, the react-native.config.js may be unusable.',
    );
  }
}

const platformName = 'tvos';

const run = {
  name: `run-${platformName}`,
  description: 'builds your app and starts it on tvOS simulator',
  func: apple.createRun({platformName}),
  examples: [
    {
      desc: 'Run on a specific simulator',
      cmd: `npx react-native run-${platformName} --simulator "Apple TV"`,
    },
  ],
  options: apple.getRunOptions({platformName}),
};

const log = {
  name: `log-${platformName}`,
  description: 'starts tvOS device syslog tail',
  func: apple.createLog({platformName: platformName}),
  options: apple.getLogOptions({platformName}),
};

const build = {
  name: `build-${platformName}`,
  description: 'builds your app for tvOS platform',
  func: apple.createBuild({platformName}),
  examples: [
      {
      desc: 'Build the app for all tvOS devices in Release mode',
      cmd: `npx react-native build-${platformName} --mode "Release"`,
      },
  ],
  options: apple.getBuildOptions({platformName}),
};

module.exports = [run, log, build];
