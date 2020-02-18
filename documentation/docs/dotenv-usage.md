---
id: dotenv-usage
title: Enviroment Variables(.env)
sidebar_label: Enviroment Variables
---



This boilerplate uses dotenv plugin to expose environment variables to the Next.js runtime configuration.

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.


There are two modes for use:

- client: You can access both client and server.
Example:  ```API_URL```

- server: Only serverside can access
Example: ```ANY_SECRET_TOKEN```

Add environment-specific variables on new lines in the form of NAME=VALUE in .env file.

```
API_KEY=test1234
```
 İf you use unit testing, you should add same variable into .env.test file.

 After defining keys in the .env file, you need to define the same keys into ```withConfig``` in the ```next.config.js``` file.
<br>

```
const withConfig = nextRuntimeDotenv({
  public: [
    'API_URL',
    'API_KEY'
  ],
  server: [
    'ANY_SECRET_TOKEN'
  ]
})
```
<br>

> **WARNING**:

- The .env file only needs to be used in the development process.

- [Environment variable](https://en.wikipedia.org/wiki/Environment_variable) should be used for production use.
