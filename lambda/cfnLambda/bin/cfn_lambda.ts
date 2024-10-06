#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MyAmplifyAppStack } from '../lib/cfn_lambda-stack';
import { randomUUID } from 'crypto'

const app = new cdk.App();
const myEnv = { account: '022499047349', region: 'us-west-2' }

new MyAmplifyAppStack(app, 'a' + randomUUID(), {env: myEnv});