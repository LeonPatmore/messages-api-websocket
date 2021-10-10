 help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

push:
	sam build -u
	sam deploy --stack-name messages-api-gateway --resolve-s3 --capabilities CAPABILITY_IAM

fmt:
	npx prettier -c "**"
