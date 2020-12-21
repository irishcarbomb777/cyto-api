import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
    const params = {
        TableName: process.env.tableName,
        Item: {
        // The attributes of the item to be created
        userId       : event.body.userId,       // User Id
        scanId       : uuid.v1(),               // Unique scan Id
        analysisType : event.body.analysisType, // Analysis Type
        dataOutput   : event.body.dataOutput    // Data output for specific analysis
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});