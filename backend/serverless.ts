import type { AWS } from '@serverless/typescript';

import createMeeting from '@functions/createMeeting';
import deleteMeeting from '@functions/deleteMeeting';

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
  // import the function via paths
  functions: { createMeeting, deleteMeeting },
};

module.exports = serverlessConfiguration;
