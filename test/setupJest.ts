import '@testing-library/jest-dom';

import { configureToMatchImageSnapshot } from 'jest-image-snapshot';

jest.setTimeout(process.env.CI === 'true' ? 30000 : 15000);

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  customDiffConfig: {
    threshold: 0.35,
    includeAA: true,
  },
  blur: 1,
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
  allowSizeMismatch: true,
  diffDirection: 'vertical',
  dumpDiffToConsole: process.env.CI === 'true',
  updatePassedSnapshot: false,
});

expect.extend({ toMatchImageSnapshot });
