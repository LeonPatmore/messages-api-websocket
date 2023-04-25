# Messages Api Websocket

A websocket for the Messages Api.

https://developer.nexmo.com/api/messages-olympus

## How it Works

Messaegs api MT requests to the websocket are proxied to the messages api. Callbacks from the messages api are then caught and sent back to the websocket that originally sent the message.

## API

### Requests

Websocket requests should be a JSON with two keys:

-   `auth`: Auth header value.
-   `body`: Messages api request as a JSON. Uses V1 messages api.

**Example**:

```json
{
    "auth": "Basic abc123",
    "body": {
        "channel": "sms",
        "from": "wstest",
        "to": "4412346789",
        "message_type": "text",
        "text": "Leon is cool"
    }
}
```

### Responses/Callbacks

The response format is indentical to the messaegs api format, as all HTTP respones and callbacks are directly proxied to the websocket without changes.

## Dev Tasks

### Setup

`make install`

### Testing

`make test`

### Formatting

`make fmt`

### Deploying

`make push`
