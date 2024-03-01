import * as cdk from 'aws-cdk-lib';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import { Construct } from 'constructs';
import * as waf from 'aws-cdk-lib/aws-wafv2';

const MANAGED_RULES = [
  {
    name: 'KnownBadInputsRuleSet',
    managedRuleName: 'AWSManagedRulesKnownBadInputsRuleSet',
  },
  {
    name: 'CommonRuleSet',
    managedRuleName: 'AWSManagedRulesCommonRuleSet',
  },
  {
    name: 'IpReputationList',
    managedRuleName: 'AWSManagedRulesAmazonIpReputationList',
  },
  {
    name: 'SQLiRuleSet',
    managedRuleName: 'AWSManagedRulesSQLiRuleSet',
  },
];

export class cdkStack extends cdk.Stack {
  public readonly webAcl: waf.CfnWebACL;
  public readonly webAclAssociation: waf.CfnWebACLAssociation;

  constructor(
    scope: Construct,
    id: string,
    props?: cdk.StackProps,
    amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps
  ) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */

    // Access other Amplify Resources
    const dependencies: AmplifyDependentResourcesAttributes =
      AmplifyHelpers.addResourceDependency(
        this,
        amplifyResourceProps.category,
        amplifyResourceProps.resourceName,
        [{ category: 'api', resourceName: 'LivenessByobApi' }]
      );
    const apiId = cdk.Fn.ref(dependencies.api.LivenessByobApi.ApiId);
    const envName = AmplifyHelpers.getProjectInfo().envName;

    this.webAcl = new waf.CfnWebACL(this, 'WebAcl', {
      defaultAction: { allow: {} },
      scope: 'REGIONAL',
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: `WafAclMetric`,
        sampledRequestsEnabled: false,
      },
      rules: this.getWebAclRules(),
    });

    this.webAclAssociation = new waf.CfnWebACLAssociation(
      this,
      'WebAclAssociation',
      {
        webAclArn: this.webAcl.attrArn,
        resourceArn: this.getApiGatewayResourceArn(apiId, envName),
      }
    );
  }

  private getWebAclRules(id = 'AWS-'): waf.CfnWebACL.RuleProperty[] {
    return MANAGED_RULES.map((rule, index) =>
      this.getAwsManagedRuleProperty(
        `${id}${rule.name}`,
        rule.managedRuleName,
        index
      )
    );
  }

  private getAwsManagedRuleProperty(
    name: string,
    managedRuleName: string,
    priority: number
  ): waf.CfnWebACL.RuleProperty {
    return {
      priority,
      name,
      overrideAction: { none: {} },
      visibilityConfig: {
        cloudWatchMetricsEnabled: true,
        metricName: name,
        sampledRequestsEnabled: false,
      },
      statement: {
        managedRuleGroupStatement: {
          vendorName: 'AWS',
          name: managedRuleName,
        },
      },
    };
  }

  private getApiGatewayResourceArn(apiId: string, envName: string): string {
    const { partition, region } = this;

    return `arn:${partition}:apigateway:${region}::/restapis/${apiId}/stages/${envName}`;
  }
}
