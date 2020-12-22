import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId, // The userId of the scan to be deleted
      scanId: event.pathParameters.scanId, // The scanId of the scan to be deleted
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});