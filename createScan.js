import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// Exporting the function "main"
export const main = handler(async (event, context) => {
    // NOTE: The JSON.parse line is required
    // You'll have to play around a little more to fully understand why
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
        // The attributes of the item to be created
        userId       : event.requestContext.identity.cognitoIdentityId,       // User Id
        scanId       : uuid.v1(),               // Unique scan Id
        analysisType : data.analysisType, // Analysis Type
        dataOutput   : data.dataOutput,    // Data output for specific analysis
    },
  };


  await dynamoDb.put(params);   //From dynamodb-lib.js

  return params.Item;
});