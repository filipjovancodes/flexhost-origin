import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export class DeploymentStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Create a new IAM role with admin permissions
        const adminRole = new iam.Role(this, 'LambdaAdminRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        });

        // Attach the AWS managed Admin policy to the role
        adminRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'));

        // Create the Lambda function with the admin role
        const deployLambdaFunction = new lambda.Function(this, 'DeployLambdaFunction', {
            timeout: cdk.Duration.minutes(5),
            runtime: lambda.Runtime.NODEJS_20_X, // or your desired runtime
            handler: 'index.handler', // The file and function name
            code: lambda.Code.fromAsset(
                '/Users/filipjovanovic/Projects/test-manual-deployment/my-amplify-app/lambda/buildLambda'
            ), // Path to your lambda code
            role: adminRole, // Attach the admin role to the Lambda function
        });
    }
}
