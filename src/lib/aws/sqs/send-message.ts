import { sqsAwsClient } from "./client";

const sendMessageToQueue = async (messageBody: string, queueUrl: string) => {
  await sqsAwsClient.sendMessage({
    MessageBody: messageBody,
    QueueUrl: queueUrl,
  });
};

export { sendMessageToQueue };
