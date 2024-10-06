#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyAmplifyAppStack } from '../lib/my-amplify-app-stack';
import { DeploymentStack } from '../lib/deployment-stack';

const myEnv = { account: '022499047349', region: 'us-west-2' }
const app = new cdk.App();

const stackName = 'MyAmplifyAppStack'
const appName = 'AmplifyTestApp123';
const bucketName = 'test-amplify-filipjov';
const buildZipPath = '/Users/filipjovanovic/Projects/test-manual-deployment/my-amplify-app/react-app/build/Archive.zip';
new MyAmplifyAppStack(app, stackName, appName, bucketName, buildZipPath, {env: myEnv});
new DeploymentStack(app, 'DeploymentStack', {env: myEnv});