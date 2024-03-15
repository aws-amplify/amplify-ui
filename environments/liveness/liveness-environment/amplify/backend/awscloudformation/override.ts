import { AmplifyRootStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyRootStackTemplate) {
  const authRole = resources.authRole;

  const basePolicies = Array.isArray(authRole.policies)
    ? authRole.policies
    : [authRole.policies];

  authRole.policies = [
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
