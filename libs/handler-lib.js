export default function handler(lambda) {
  return async function (event, context) {
    let body, statusCode;

    try {
      // Run the Lambda
      body = await lambda(event, context);
      statusCode = 200;
    } catch (e) { // Catch will catch any error that is sent to it from running the try block
      body = { error: e.message };
      statusCode = 500;
    }

    // Return HTTP response
    return {
      statusCode,
      // Note that JSON.stringify is required here in order to send from the
      // lambda function. Without this you were getting 502 'bad gateway' errors
      body: JSON.stringify(body),
      // The below headers section causes any lamba function called from the
      // handler function to return the following CORS headers.
      headers : {
        "Access-Control-Allow-Origin"      : "*",
        "Access-Control-Allow-Credentials" : true,
      },
    };
  };
}