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

    const appName = process.env.APP_NAME || 'AmplifyTestApp123';
    const bucketName = process.env.BUCKET_NAME || 'a3d25eb4-63b1-44c1-9e52-659f7a45b16f';
    const keyName = process.env.ZIP_BUILD_PATH || '/tmp/build.zip';

    const asset = new Asset(this, 'S3Asset', { path: keyName });

    const amplifyApp = new amplify.App(this, id, {
      appName: appName,
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
    });
  }
}
