
push:
	sam build -u
	sam deploy --stack-name messages-api-gateway --resolve-s3 --capabilities CAPABILITY_IAM
