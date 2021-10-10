 help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

test:
	npm test

fmt:
	npx prettier -c "**"

push: fmt test
	sam build -u
	sam deploy --stack-name messages-api-gateway --resolve-s3 --capabilities CAPABILITY_IAM
