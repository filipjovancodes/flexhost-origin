#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyAmplifyAppStack } from '../lib/my-amplify-app-stack';
import { BuildLambdaStack } from '../lib/build-lambda-stack';

const myEnv = { account: '022499047349', region: 'us-west-2' }
const app = new cdk.App();
new MyAmplifyAppStack(app, 'MyAmplifyAppStack', {env: myEnv});
new BuildLambdaStack(app, 'BuildLambdaStack', {env: myEnv});