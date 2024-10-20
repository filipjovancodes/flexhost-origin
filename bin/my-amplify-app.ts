#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AmplifyStack } from '../lib/my-amplify-app-stack';
import { DeploymentStack } from '../lib/deployment-stack';

const myEnv = { account: '022499047349', region: 'us-west-2' }
const app = new cdk.App();

const stackName = 'AmplifyStack'
const appName = 'AmplifyTestApp';
const bucketName = 'test-amplify-filipjov';
const buildZipPath = '/Users/filipjovanovic/Projects/test-manual-deployment/my-amplify-app/react-app/build/Archive.zip';
new AmplifyStack(app, stackName, appName, bucketName, buildZipPath, {env: myEnv});
new DeploymentStack(app, 'DeploymentStack', {env: myEnv});