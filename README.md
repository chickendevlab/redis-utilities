# redis-utilities
This package currently contains very few functions, which save me work in various places. Depending on the need I will add more functions here.

If you still want to use or extend redis-utilities, just create a pull request.

## Installation
```
npm i --save redis-utilities
```

## How to use
```js
const RedisUtilities = require('redis-utilities')
/* or if you only need as example ScanUtils */
const ScanUtils = require('redis-utilities').ScanUtils

const client = require('redis').createClient() // see https://www.npmjs.com/package/redis

const util = new RedisUtilities(client)
```

## [Documentation](chickendevlab.github.io/redis-utilities)