export function override(resources, amplifyProjectInfo) {
  const unauthRole = resources.unauthRole;

  const basePolicies = Array.isArray(unauthRole.policies)
    ? unauthRole.policies
    : [unauthRole.policies];

  unauthRole.policies = [
    ...basePolicies,
    {
      policyName: 'liveness-streaming-api-access',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Resource: '*',
            Action: ['rekognition:StartFaceLivenessSession'],
            Effect: 'Allow',
          },
        ],
      },
    },
  ];
}
