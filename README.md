[![Automated Cypress Testing](https://github.com/Roselynepj1/social-media-client/actions/workflows/e2e-tests.yml/badge.svg)](https://github.com/Roselynepj1/social-media-client/actions/workflows/e2e-tests.yml)

[![Automated Unit Testing](https://github.com/Roselynepj1/social-media-client/actions/workflows/unit-tests.yml/badge.svg)](https://github.com/Roselynepj1/social-media-client/actions/workflows/unit-tests.yml)

# Social Media Client - Workflow CA

### Table of Contents

1. Getting Started.
2. Prettier Configurations.
3. ESLint Configurations.
4. Branch Protection.
5. Jest Unit Testing.
6. Cypress E2E Testing.
7. Github Actions Workflow.

## 1. Getting Started

1. Clone the repo through github website or CLI command:

```
git clone https://github.com/Roselynepj1/social-media-client.git
```

2. Run `npm install` to install all dependencies.
3. Run `npm start` to start the development server.

## 2. Prettier

1. Configurations for VSCode workspace settings to format with prettier on save `.vscode` > `settings.json`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"]
}
```

2. Configurations for `package.json` which include `lint-staged` dependency to format on commit

```json
"lint-staged": {
    "*.js": [
      "prettier --write",
      "eslint --fix"
    ],
    "*.html": [
      "prettier --write"
    ],
    "*.scss": [
      "prettier --write"
    ]
  }
```

## 3. ESLint

`.eslintrc.js` file configurations include

1. `overrides` for both `Jest Unit Testing` and `Cypress E2E Testing`
2. Extends `prettier` and `jest/recommended` plugin to avoid conflicts between them and `eslint`

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'prettier', 'plugin:jest/recommended'],
  plugins: ['jest'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
  ignorePatterns: ['node_modules/', 'build/', 'dist/'],
}
```

2. `rules` for `cypress.config.js` file which will ignore `no-unused-vars`, this config prevents eslint from triggering a total halt of the process when commiting.

```json

"rules": {
    "cypress/no-unnecessary-waiting": "off",
    "no-unused-vars": "error"
  }
```

## 4. Branch Protection

Repo's default (master) branch is protected with the following rules

1. Require a pull request before merging
2. Require status checks to pass before merging
3. Require branches to be up to date before merging
4. Do not allow bypassing the above settings

## 5. Jest Unit Testing

### Babel

For the jest unit testing to work with the current coding syntax this project incorporates the use of `Babel` dependency:

- the configurations for the `babel.config.js` file are

```js
module.exports = {
  presets: ['@babel/preset-env'],
}
```

### Jest Tests

Jest unit testing includes two test files that test the login and logout functions:

1. Login Function

```
The login function is expected to make a request to a server to authenticate a user and retrieve an access token.

The test uses mock functions to simulate successful and unsuccessful responses from the server.
It tests that the login function fetches and saves the access token key when the response is successful,
deletes the token value when called again, and throws an error with the correct message when the response
is unsuccessful due to invalid credentials.

Overall, the tests ensure that the login function behaves correctly and handles different scenarios appropriately.
```

2. Logout Function

```
The logout function is expected to clear the access token from browser storage.

The test uses a mock implementation of browser storage and tests that the logout function successfully
clears the access token key and value from storage when called.

Overall, the test ensures that the logout function behaves correctly and clears the appropriate data from storage.
```

3. Headers Function

```
This test suite verifies the behavior of the `headers()` function, which is presumably a part of an API module.
The function is tested under various scenarios: when a Content-Type header is provided, when an Authorization token is stored, when no token is stored, and when both Content-Type and token are present.
The tests utilize Jest to mock the storage module and simulate different scenarios, ensuring that the function returns the correct headers object according to the provided conditions.

```

4. Posts Functions

```
This script contains Jest test suites for various functions related to interacting with posts in a social media API.
Each test suite focuses on a specific function (`createPost`, `deletePost`, `react`, `getPosts`, `getPost`, and `updatePost`) and includes tests for different scenarios, such as sending requests with correct parameters and handling responses when the server's status is not successful.
Additionally, the script includes mocks for the `fetch` function and the user's profile data, ensuring that the tests can run independently of external dependencies. These tests ensure the reliability and correctness of the post-related API functions.

```

5. Profile Functions

```
This script contains Jest test suites for various functions related to interacting with user profiles in a social media API.
Each test suite focuses on a specific function (`deleteProfile`, `followProfile`, `getProfiles`, `getProfile`, `unfollowProfile`, and `updateProfileImage`) and includes tests for different scenarios, such as sending requests with correct parameters and handling responses when the server's status is not successful.
Additionally, the script includes mocks for the `fetch` function and the user's profile data, ensuring that the tests can run independently of external dependencies.
```

6. State Functions

```
This script contains Jest test suites for authentication-related functions (`isLoggedIn` and `profile`) in a web environment (`jsdom`).
The `isLoggedIn` function is tested to ensure it returns true when a token is stored and false when no token is stored. Similarly, the `profile` function is tested to ensure it retrieves profile data from storage correctly and handles cases where no profile is stored.
The `load` function from the storage module is mocked to simulate different scenarios in the tests.
```

7. Registering a user

```
This Jest test suite focuses on testing the register function from the authentication module. It consists of three test cases:

Successful registration: This test case simulates a successful registration by mocking a response where the server returns a successful status (ok: true). It asserts that the register function makes a POST request with the correct parameters and headers and that it returns the expected response data.

Failed registration: This test case simulates a failed registration by mocking a response where the server returns an unsuccessful status (ok: false) with an appropriate error message. It asserts that calling the register function with valid parameters throws the expected error.

Invalid email domain: This test case simulates a scenario where the user tries to register with an email domain other than @noroff.no or @stud.noroff.no. It mocks a response indicating an invalid email domain and asserts that calling the register function with an invalid email domain throws the expected error.

In each test case, the fetch function is mocked to simulate network requests, and after each test, the original implementation of fetch is restored to maintain isolation between tests.

```

8. Storage functions

```
The storage-related function test suites rigorously validate the behavior of key functions—load, remove, and save—which interact with the browser's localStorage.
The load function test suite meticulously assesses data retrieval, mocking localStorage.getItem to simulate scenarios where valid JSON, null, or errors are returned, ensuring the function's robustness and accurate handling of various storage states.
Conversely, the remove function test suite rigorously confirms the accurate removal of specified data by mocking localStorage.removeItem and verifying its invocation with the appropriate key.
Similarly, the save function test suite meticulously examines data storage, ensuring that localStorage.setItem is called with the correct key and stringified value, thus ensuring precise data storage behavior.
Collectively, these test suites comprehensively scrutinize the storage functions, affirming their reliability and accuracy in managing data within localStorage.
```

## 6. Cypress E2E Testing

### Cypress.env.json

To protect any vital user credentials, this project incorporates the use of `cypress.env.json` file.

1. Make a `cypress.env.json` file in your root folder.
2. Add this file into `.gitignore`.
3. Populate your `cypress.env.json` file with desired user information:

   ```json
   {
     "user-email": "your-desired-user-email",
     "user-password": "the-connected-user-password",
     "wrong-user": "any-wrong-user-email",
     "wrong-password": "any-wrong-user-password"
   }
   ```

4. You can now use these variables across your tests by calling them with `Cypress.env('user-email')`, example:

   ```js
   cy.get("input#loginEmail[type='email']").type(Cypress.env("user-email"));.

   ```

### E2E Tests

1. `Invalid` User Credentials

```
The test uses Cypress, a JavaScript-based end-to-end testing framework, to interact with the application UI and
verify its behavior.

It visits the login page, and enters invalid login credentials.
Then, it checks that an error message is displayed with the expected text.

```

2. `Valid` User Credentials

```
The test uses Cypress to interact with the application UI and verify its behavior.
It visits the login page, enters valid login credentials, and clicks the login button.
Then, it checks that the URL includes the "profile" path, indicating that the user has been
redirected to their profile page.

```

3. Logout Behavior

```
This test checks if a user can successfully log out of the Noroff SoMe application.
It starts by visiting the application homepage, and then logging in
with valid user credentials.
Once logged in, it waits for 2 seconds and then clicks on the logout button.

It then waits for 2 second and checks if the token has been removed from the local storage,
confirming that the user has been logged out.
```

## 7. Github Actions Workflow

The repo has three (2) active workflow actions that do the following:

1. Runs `Jest Tests` on `pull_request` or `workflow_dispatch`.
2. Runs `Cypress E2E Tests` on `pull_request` or `workflow_dispatch`.
   - The cypress workflow incorporates the use of a `secret` to write and call on a action specific `cypress.env.json` file that has user credentials for the tests to properly work.
