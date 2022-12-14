# cookunity-test

This is a test repo for the cookunity opportunity.

## Tech involved

I used [FoalTS](https://foalts.org/docs/) as a minimalistic framework that allows me to use awesome patterns and features like:

- Dependency injection to easly mock apis in e2e tests.
- Swagger.
- Api params sanitization.
- Typescript and boilerplate project config like testing environment and env variables.

## Assumptions

- I should use a persistence layer like a DB with an ORM in a Kubernetes cluster, but for sake of simplicity I'm storing data in memory so just assume that the repository pattern implementation is connecting to a remote clusterized db.
- Having in mind the 5 millons requests per minute expected traffic, this app should be deployed on a Kubernetes cluster in coordination with a devops to determine how many nodes and what the specs of each one should be having in mind that this app has the next requirements: medium network consumption, low cpu consumption and medium ram consumption.
- I can suggest using a cache like redis to store results since the apis are idepmotent, given the same input it will return the same result.

## TODO

- I'm running out of time for the test, but I should create a docker file.

## Getting started

### Dev

1. Create a .env variable using the template file and set your api-layer key in there.

```shell script
cp .env.template .env
```

2. Start a dev server with:

```shell script
npm run dev
```

### Automatic testing

Start e2e test suite with:

```shell script
npm run e2e
```

### Live testing

Live test with:

- Swagger: http://localhost:3001/swagger
- Url: http://localhost:3001/api/statistics and http://localhost:3001/api/traces

## Patterns used

- MVC
- Repository: I can easly hide persistence layer details.
- Dependency injection: I can mock 3rd party calls to avoid reaching api limits and keep the testing in our business logic.
