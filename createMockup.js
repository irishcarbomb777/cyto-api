import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// Exporting the function "main"
export const main = handler(async (event, context) => {
    // NOTE: The JSON.parse line is required
    // You'll have to play around a little more to fully understand why
    const data = JSON.parse(event.body);    // Use this for live aws calls
    // const data = event.body;             //Use this line for mock jsons from serverless
    const params = {
        TableName: process.env.tableName,
        Item: {
        // The attributes of the item to be created
        itemId       : data.itemId,       // User Id
        imprintId    : data.imprintId,               // Unique scan Id
        align        : data.align,
        position     : data.position, // Analysis Type
        maxWidth     : data.maxWidth,    // Data output for specific analysis
        maxHeight    : data.maxHeight,
    },
  };


  await dynamoDb.put(params);   //From dynamodb-lib.js

  return params.Item;
});