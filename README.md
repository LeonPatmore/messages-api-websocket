# Messages Api Websocket

A websocket for the Messages Api.

https://developer.nexmo.com/api/messages-olympus

## How it Works

Messaegs api MT requests to the websocket are proxied to the messages api. Callbacks from the messages api are then caught and sent back to the websocket that originally sent the message.

## API

### Connection Request

Your connection request should include the `Authorization` header with value `Bearer <message_api_token>`. This will be used as the token for all subsequent requests.

### Sending Messages

To make a request to the messages api, simply write a websocket message in the same format as a messages api request.

**Example**:

```json
{
    "channel": "sms",
    "from": "wstest",
    "to": "4412346789",
    "message_type": "text",
    "text": "Leon is cool"
}
```

### Responses/Callbacks

The response format is indentical to the messaegs api format, as all HTTP respones and callbacks are directly proxied to the websocket without changes.

## Dev Tasks

### Setup

`make install`

Create the file `.env` at the root of the project containing the following:

```
export AWS_PROFILE=<profile>
export AWS_REGION=<region>
```

### Testing

`make test`

### Formatting

`make fmt`

### Deploying

`make push`
