import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class BuildLambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // Define a Lambda function
        const myFunction = new lambda.Function(this, 'MyLambdaFunction', {
            timeout: cdk.Duration.minutes(15),
            runtime: lambda.Runtime.NODEJS_20_X, // or your desired runtime
            handler: 'index.handler', // The file and function name
            code: lambda.Code.fromAsset(
            '/Users/filipjovanovic/Projects/test-manual-deployment/my-amplify-app/lambda/buildLambda'
            ), // Path to your lambda code
        });
    }
}