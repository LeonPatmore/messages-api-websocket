
push-gateway:
	sam build
	sam deploy --stack-name messages-api-gateway
