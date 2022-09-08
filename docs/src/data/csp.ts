export const ANALYTICS_CSP = {
  all: {
    connect: [
      'amazonwebservices.d2.sc.omtrdc.net',
      'aws.demdex.net',
      'dpm.demdex.net',
      'cm.everesttech.net',
    ],
    img: [
      'amazonwebservices.d2.sc.omtrdc.net',
      'aws.demdex.net',
      'dpm.demdex.net',
      'cm.everesttech.net',
      'images.unsplash.com',
    ],
    frame: ['*.aws.demdex.net', 'dpm.demdex.net'],
    script: ['a0.awsstatic.com', 'aa0.awsstatic.com'],
  },
  prod: {
    connect: ['d2c.aws.amazon.com', 'vs.aws.amazon.com', 'a0.awsstatic.com'],
    img: ['a0.awsstatic.com'],
    frame: [],
  },
};
