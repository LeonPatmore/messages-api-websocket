const bodyParser = require('body-parser');
const express = require('express')
const AWS = require('aws-sdk');


const app = express()
const PORT = 1234

app.use(bodyParser.json());

const apigwManagementApi = new AWS.ApiGatewayManagementApi({
    region: 'eu-west-1',
    apiVersion: '2018-11-29',
    endpoint: "https://twt48trjg0.execute-api.eu-west-1.amazonaws.com/test"
});

app.post('/', async (req, res) => {
    console.log("body: " + req.body)
    console.log(req.headers)
    const connectionId = req.body.myConnectionIdProperty
    console.log("connection id: " + connectionId)
    if (connectionId != undefined) {
        await apigwManagementApi.postToConnection({
            ConnectionId: connectionId,
            Data: '{"hi": "hello"}'
        }).promise();
    }
    res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://0.0.0.0:${PORT}`)
})


