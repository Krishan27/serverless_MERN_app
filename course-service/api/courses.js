'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 

AWS.config.setPromisesDependency(require('bluebird'));

const dynamoDb = new AWS.DynamoDB.DocumentClient();


// Get All the courses


module.exports.getall = (event, context, callback) => {
    var params = {
        TableName: process.env.COURSE_TABLE,
        ProjectionExpression: "id, title,author,category"
    };

    console.log("Scanning Course table.");
    const onScan = (err, data) => {

        if (err) {
            console.log('Scan failed to load data. Error JSON:', JSON.stringify(err, null, 2));
            callback(err);
        } else {
            console.log("Scan succeeded.");
            return callback(null, {
                statusCode: 200,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*'
              },
                body: JSON.stringify({
                    courses: data.Items
                })
            });
        }

    };

    dynamoDb.scan(params, onScan);

};

// Get the course by ID

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.COURSE_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.get(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      const response = {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
    }
      callback(new Error('Couldn\'t fetch course.'));
      return;
    });
};


// Create a new course 

module.exports.create = (event, context, callback) => {
  const requestBody = JSON.parse(event.body);
  const title = requestBody.title;
  const author = requestBody.author;
  const category = requestBody.category;
  const duration = requestBody.duration;
  
console.log(typeof title, typeof author, typeof category , typeof duration)
  if (typeof title !== "string" || typeof author !== "string" || typeof category !== "string" || typeof duration !== "string") {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t submit candidate because of validation errors.'));
    return;
  }

  submitCourse(courseInfo(title, author, category,duration))
    .then(res => {
      callback(null, {
        statusCode: 200,
        "headers": {
        "Content-Type": "*/*"},
        body: JSON.stringify({
          message: `Sucessfully submitted course ${author}`,
          courseId: res.id
        })
      });
    })
    .catch(err => {
      console.log(err);
      callback(null, {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
        body: JSON.stringify({
          message: `Unable to submit course ${author}`
        })
      })
    });
};


const submitCourse = course => {
  console.log('Submitting course');
  const courseInfo = {
    TableName: process.env.COURSE_TABLE,
    Item: course,
  };
  var auth = course.author.split(" ");
  var authId = auth.join("-")
  const authorInfo = {
    TableName: process.env.AUTHOR_TABLE,
    Item: {
      id:course.id,
      firstName: auth[0],
      lastName: auth[1]
    }
  };
  console.log(authorInfo)
  
  return dynamoDb.put(courseInfo).promise()
  .then(dynamoDb.put(authorInfo).promise().then(res => courseInfo));
    
};



const courseInfo = (title, author, category,duration) => {
  const timestamp = new Date().getTime();
  return {
    id: uuid.v1(),
    title: title,
    author: author,
    category: category,
    duration: duration,
    submittedAt: timestamp,
    updatedAt: timestamp,
  };
};


// Update the course 

module.exports.update = (async (event, context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.COURSE_TABLE,

    Key: {
      id: event.pathParameters.id
    },

    UpdateExpression: "SET title = :title, author = :author, category = :category, duration= :duration",
    ExpressionAttributeValues: {
      ":title": data.title ,
      ":author": data.author ,
      ":category": data.category , 
      ":duration": data.duration 
    },
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
  },

    ReturnValues: "ALL_NEW"
  };

  await dynamoDb.put(params);

  return { status: true };
});

//Delete the course 

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.COURSE_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.delete(params).promise()
    .then(result => {
      const response = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
      },
        body: JSON.stringify("Course deleted"),
      };
      callback(null, response);
    })
    .catch(error => {
      console.error(error);
      const response = {
        statusCode: 400}
      callback(new Error('Couldn\'t fetch course.'));
      return;
    });
};
