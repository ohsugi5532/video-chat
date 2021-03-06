import type { AWS } from '@serverless/typescript';

import createMeeting from '@functions/createMeeting';
import deleteMeeting from '@functions/deleteMeeting';
import joinMeeting from '@functions/joinMeeting';
import getAttendee from '@functions/getAttendee';

const serverlessConfiguration: AWS = {
  service: 'backend',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  plugins: [
    'serverless-webpack',
    'serverless-offline',
    'serverless-dotenv-plugin',
  ],
  useDotenv: true,
  provider: {
    name: 'aws',
    region: 'ap-northeast-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: { createMeeting, deleteMeeting, joinMeeting, getAttendee },
};

module.exports = serverlessConfiguration;
