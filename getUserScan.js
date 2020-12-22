import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    // 'Key' defines the partition key and sort key of the item to be retrieved
    Key: {
      userId :  event.requestContext.identity.cognitoIdentityId, // The id of the user
      scanId :  event.pathParameters.scanId, // The id of the scan
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    // Create a new Error to be caught in a try catch block when this
    // function is called
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return result.Item;
});