include .env

help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install:
	npm install

test:
	npm test

fmt:
	npx prettier -c "**"

fixfmt:
	npx prettier -w "**"

clean:
	rm -Rf build

build: clean fmt test
	mkdir build
	cp -R ./src ./build
	cp template.yaml ./build/template.yaml
	cp package.json ./build/package.json
	cd build; sam build -u

push: build
	cd build; sam deploy --stack-name messages-api-gateway --resolve-s3 --capabilities CAPABILITY_IAM --profile ${AWS_PROFILE} --region ${AWS_REGION}
