const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getall = (event, context, callback) => {
  var params = {
      TableName: process.env.AUTHOR_TABLE,
      ProjectionExpression: "id,firstName, lastName"
  };

  console.log("Scanning Author table.");
  const onScan = (err, data) => {

      if (err) {
          console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
          callback(err);
      } else {
          console.log("Scan succeeded.");
          return callback(null, {
              statusCode: 200,
              body: JSON.stringify({
              author: data.Items
              })
          });
      }

  };

  dynamoDb.scan(params, onScan);

};
