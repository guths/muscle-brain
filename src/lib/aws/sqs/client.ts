import { SQS } from "@aws-sdk/client-sqs";

const AWS_REGION = process.env.AWS_REGION || "us-east-1";

const AWS_ENDPOINT =
  process.env.APP_ENV === "local" ? "http://localstack:4566" : undefined;

const sqsAwsClient = new SQS({
  region: AWS_REGION,
  endpoint: AWS_ENDPOINT,
});

export { sqsAwsClient };
