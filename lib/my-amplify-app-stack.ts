import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class MyAmplifyAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = s3.Bucket.fromBucketName(this, 'MyBucket', 'test-amplify-filipjov')

    const asset = new Asset(this, 'S3Asset', {
      path: '/Users/filipjovanovic/Projects/test-manual-deployment/test/build/Archive.zip'
    });

    // Define the Amplify app
    const amplifyApp = new amplify.App(this, 'MyAmplifyApp', {
      appName: 'MyReactApp1',
      customRules: [
        {
          source: '/<*>',
          target: '/index.html',
          status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
        },
      ],
    });

    const branch = amplifyApp.addBranch('main', {
      branchName: 'main',
      autoBuild: true,
      asset: asset,
    })

    // Define a Lambda function
    const myFunction = new lambda.Function(this, 'MyLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_20_X, // or your desired runtime
      handler: 'index.handler', // The file and function name
      code: lambda.Code.fromAsset(
        '/Users/filipjovanovic/Projects/test-manual-deployment/my-amplify-app/lambda/s3lambda'
      ), // Path to your lambda code
    });

    bucket.grantRead(myFunction)

    // Add an inline policy to the Lambda function's role for S3 read access
    myFunction.addToRolePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [
        `arn:aws:s3:::test-amplify-filipjov/*`,
        `arn:aws:s3:::test-amplify-filipjov`
      ], // Specify the S3 bucket and all objects in it
    }));

    const api = new apigateway.LambdaRestApi(this, 'MyApi', {
      handler: myFunction,
      proxy: false,
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS, // Allow all origins
        allowMethods: apigateway.Cors.ALL_METHODS, // Allow all methods (GET, POST, etc.)
        allowHeaders: [
          'Content-Type',
          'X-Amz-Date',
          'Authorization',
          'X-Api-Key',
          'X-Amz-Security-Token',
          'Access-Control-Allow-Origin', // Allow this header if needed
        ], // Allow specific headers
      },
    });

    // Define a resource and method for your API
    const items = api.root.addResource('items');
    items.addMethod('GET'); // Allows GET requests to /items
    items.addMethod('POST'); // Allows POST requests to /items
  }
}
