# impress-router-table
> Sails.js like routing for koa.js

[![Build Status](https://img.shields.io/travis/magicdawn/impress-router-table.svg?style=flat-square)](https://travis-ci.org/magicdawn/impress-router-table)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/impress-router-table.svg?style=flat-square)](https://codecov.io/gh/magicdawn/impress-router-table)
[![npm version](https://img.shields.io/npm/v/impress-router-table.svg?style=flat-square)](https://www.npmjs.com/package/impress-router-table)
[![npm downloads](https://img.shields.io/npm/dm/impress-router-table.svg?style=flat-square)](https://www.npmjs.com/package/impress-router-table)
[![npm license](https://img.shields.io/npm/l/impress-router-table.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install
```sh
$ npm i impress-router-table --save
```

## API
```js
const routing = require('impress-router-table');
```

### `routing(rootdir)`
returns a koa middleware

```js

const app = new (require('koa'))

app.use(routing(__dirname + '/api'))

app.listen(9000)
```

#### Folder structure in `rootdir`

for example in previous example, `__dirname + '/api'`,
take a look at [test/demo/api/](test/demo/api/)

```
test/demo/api
├── controllers
│   ├── PolicyTestController.js
│   └── RouteTestController.js
├── policies
│   ├── auth.js
│   └── bar.js
├── policy.js # policy config
└── routes.js # routes config

2 directories, 6 files
```

## Changelog
[CHANGELOG.md](CHANGELOG.md)

## License
the MIT License http://magicdawn.mit-license.org