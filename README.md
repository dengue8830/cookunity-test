# cookunity-test

This is a test repo for the cookunity opportunity.

## Getting started

Start a dev server with:
`npm run dev`

Start e2e test suite with:
`npm run e2e`

Live test with:
http://localhost:3001/swagger

## Patterns used

- MVC
- Repository: We can easly hide persistence layer details.
- Dependency injection: We can mock 3rd party calls to avoid reaching api limits and keep the testing in our business logic.
