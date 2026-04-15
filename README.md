# @rspack/dev-middleware

<p>
  <a href="https://npmjs.com/package/@rspack/dev-middleware?activeTab=readme"><img src="https://img.shields.io/npm/v/@rspack/dev-middleware?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" /></a>
  <a href="https://npmcharts.com/compare/@rspack/dev-middleware?minimal=true"><img src="https://img.shields.io/npm/dm/@rspack/dev-middleware.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
  <a href="https://nodejs.org/en/about/previous-releases"><img src="https://img.shields.io/node/v/@rspack/dev-middleware.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="node version"></a>
  <a href="https://github.com/rstackjs/rspack-dev-middleware/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" /></a>
</p>

An express-style development middleware for use with [Rspack](https://rspack.rs). It serves the files emitted by the compiler from memory.

This should be used for **development only**.

Some of the benefits of using this middleware include:

- No files are written to disk, rather it handles files in memory
- If files changed in watch mode, the middleware delays requests until compiling
  has completed.
- Supports hot module reload (HMR).

## Getting Started

Install the module:

```bash
# npm
npm install @rspack/dev-middleware -D

# pnpm
pnpm add -D @rspack/dev-middleware

# yarn
yarn add -D @rspack/dev-middleware

# bun
bun add -D @rspack/dev-middleware
```

## Usage

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";

const compiler = rspack({
  // Rspack options
});

const app = express();

app.use(
  devMiddleware(compiler, {
    // options
  }),
);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

See [below](#other-servers) for examples of use with other servers.

## Options

|                      Name                       |               Type                |                    Default                    | Description                                                                                                          |
| :---------------------------------------------: | :-------------------------------: | :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------- |
|            **[`methods`](#methods)**            |              `Array`              |              `[ 'GET', 'HEAD' ]`              | Allows to pass the list of HTTP request methods accepted by the middleware                                           |
|            **[`headers`](#headers)**            |     `Array\|Object\|Function`     |                  `undefined`                  | Allows to pass custom HTTP headers on each request.                                                                  |
|              **[`index`](#index)**              |         `boolean\|string`         |                 `index.html`                  | If `false` (but not `undefined`), the server will not respond to requests to the root URL.                           |
|          **[`mimeTypes`](#mimetypes)**          |             `Object`              |                  `undefined`                  | Allows to register custom mime types or extension mappings.                                                          |
|    **[`mimeTypeDefault`](#mimetypedefault)**    |             `string`              |                  `undefined`                  | Allows to register a default mime type when we can't determine the content type.                                     |
|               **[`etag`](#tag)**                |   `boolean\| "weak"\| "strong"`   |                  `undefined`                  | Enable or disable etag generation.                                                                                   |
|       **[`lastModified`](#lastmodified)**       |             `boolean`             |                  `undefined`                  | Enable or disable `Last-Modified` header. Uses the file system's last modified value.                                |
|       **[`cacheControl`](#cachecontrol)**       | `boolean\|number\|string\|Object` |                  `undefined`                  | Enable or disable setting `Cache-Control` response header.                                                           |
|     **[`cacheImmutable`](#cacheimmutable)**     |             `boolean`             |                    `false`                    | Enable or disable setting `Cache-Control: public, max-age=31536000, immutable` response header for immutable assets. |
|         **[`publicPath`](#publicpath)**         |             `string`              |                  `undefined`                  | The public path that the middleware is bound to.                                                                     |
|              **[`stats`](#stats)**              |     `boolean\|string\|Object`     |        `stats` (from a configuration)         | Stats options object or preset name.                                                                                 |
|   **[`serverSideRender`](#serversiderender)**   |             `boolean`             |                  `undefined`                  | Instructs the module to enable or disable the server-side rendering mode.                                            |
|        **[`writeToDisk`](#writetodisk)**        |        `boolean\|Function`        |                    `false`                    | Instructs the module to write files to the configured location on disk as specified in your Rspack configuration.    |
|   **[`outputFileSystem`](#outputfilesystem)**   |             `Object`              | [`memfs`](https://github.com/streamich/memfs) | Set the default file system which will be used by Rspack as primary destination of generated files.                  |
| **[`modifyResponseData`](#modifyresponsedata)** |            `Function`             |                  `undefined`                  | Allows to set up a callback to change the response data.                                                             |

The middleware accepts an `options` Object. The following is a property reference for the Object.

### methods

Type: `Array`  
Default: `[ 'GET', 'HEAD' ]`

This property allows a user to pass the list of HTTP request methods accepted by the middleware\*\*.

### headers

Type: `Array|Object|Function`
Default: `undefined`

This property allows a user to pass custom HTTP headers on each request.
eg. `{ "X-Custom-Header": "yes" }`

or

```js
devMiddleware(compiler, {
  headers: () => ({
    "Last-Modified": new Date(),
  }),
});
```

or

```js
devMiddleware(compiler, {
  headers: (req, res, context) => {
    res.setHeader("Last-Modified", new Date());
  },
});
```

or

```js
devMiddleware(compiler, {
  headers: [
    {
      key: "X-custom-header",
      value: "foo",
    },
    {
      key: "Y-custom-header",
      value: "bar",
    },
  ],
});
```

or

```js
devMiddleware(compiler, {
  headers: () => [
    {
      key: "X-custom-header",
      value: "foo",
    },
    {
      key: "Y-custom-header",
      value: "bar",
    },
  ],
});
```

### index

Type: `Boolean|String`
Default: `index.html`

If `false` (but not `undefined`), the server will not respond to requests to the root URL.

### mimeTypes

Type: `Object`  
Default: `undefined`

This property allows a user to register custom mime types or extension mappings.
eg. `mimeTypes: { phtml: 'text/html' }`.

Please see the documentation for [`mrmime`](https://github.com/lukeed/mrmime) for more information.

### mimeTypeDefault

Type: `String`  
Default: `undefined`

This property allows a user to register a default mime type when we can't determine the content type.

### etag

Type: `"weak" | "strong"`  
Default: `undefined`

Enable or disable etag generation. Boolean value use

### lastModified

Type: `Boolean`
Default: `undefined`

Enable or disable `Last-Modified` header. Uses the file system's last modified value.

### cacheControl

Type: `Boolean | Number | String | { maxAge?: number, immutable?: boolean }`
Default: `undefined`

Depending on the setting, the following headers will be generated:

- `Boolean` - `Cache-Control: public, max-age=31536000`
- `Number` - `Cache-Control: public, max-age=YOUR_NUMBER_IN_SECONDS`
- `String` - `Cache-Control: YOUR_STRING`
- `{ maxAge?: number, immutable?: boolean }` - `Cache-Control: public, max-age=YOUR_MAX_AGE_IN_SECONDS_or_31536000`, also `, immutable` is added when you set the `immutable` option to `true`

Numeric `cacheControl` and `cacheControl.maxAge` values are interpreted as milliseconds, clamped to `0..31536000000`, and converted to seconds for the response header.

Enable or disable setting `Cache-Control` response header.

### cacheImmutable

Type: `Boolean`
Default: `false`

Enable or disable setting `Cache-Control: public, max-age=31536000, immutable` response header for immutable assets (i.e. asset with a hash like `image.a4c12bde.jpg`).

Immutable assets are assets that have their hash in the file name therefore they can be cached, because if you change their contents the file name will be changed.

When omitted, immutable assets fall back to the `cacheControl` option.

Set `cacheImmutable: true` to opt into the immutable cache header for hashed assets.
This takes precedence over the `cacheControl` option only when the asset was defined as immutable and `cacheImmutable` is `true`.

### publicPath

Type: `String`
Default: `output.publicPath` (from a configuration)

The public path that the middleware is bound to.

> Best Practice: use the same `publicPath` defined in your Rspack config.

### stats

Type: `Boolean|String|Object`
Default: `stats` (from a configuration)

Stats options object or preset name.

### serverSideRender

Type: `Boolean`  
Default: `undefined`

Instructs the module to enable or disable the server-side rendering mode.
Please see [Server-Side Rendering](#server-side-rendering) for more information.

### writeToDisk

Type: `Boolean|Function`  
Default: `false`

If `true`, the option will instruct the module to write files to the configured location on disk as specified in your Rspack config file.

_Setting `writeToDisk: true` won't change the behavior of `@rspack/dev-middleware`, and bundle files accessed through the browser will still be served from memory._

This option also accepts a `Function` value, which can be used to filter which files are written to disk.
The function follows the same premise as [`Array#filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) in which a return value of `false` _will not_ write the file, and a return value of `true` _will_ write the file to disk. eg.

```js
import { rspack } from "@rspack/core";

const configuration = {
  /* Rspack configuration */
};
const compiler = rspack(configuration);

devMiddleware(compiler, {
  writeToDisk: (filePath) => /superman\.css$/.test(filePath),
});
```

### outputFileSystem

Type: `Object`  
Default: [memfs](https://github.com/streamich/memfs)

Set the default file system which will be used by Rspack as primary destination of generated files.
This option isn't affected by the [writeToDisk](#writeToDisk) option.

This can be done simply by using `node:path`'s `join`:

```js
import { join } from "node:path";
import { rspack } from "@rspack/core";
import mkdirp from "mkdirp";
import myOutputFileSystem from "my-fs";

myOutputFileSystem.join = join;
myOutputFileSystem.mkdirp = mkdirp;

const compiler = rspack({
  /* Rspack configuration */
});

devMiddleware(compiler, { outputFileSystem: myOutputFileSystem });
```

### modifyResponseData

Allows to set up a callback to change the response data.

```js
import { rspack } from "@rspack/core";

const configuration = {
  /* Rspack configuration */
};
const compiler = rspack(configuration);

devMiddleware(compiler, {
  // Note - if you send the `Range` header you will have `ReadStream`
  // Also `data` can be `string` or `Buffer`
  modifyResponseData: (req, res, data, byteLength) =>
    // Your logic
    // Don't use `res.end()` or `res.send()` here
    ({ data, byteLength }),
});
```

## API

`@rspack/dev-middleware` also provides convenience methods that can be use to
interact with the middleware at runtime:

### `close(callback)`

Instructs the `@rspack/dev-middleware` instance to stop watching for file changes.

#### Parameters

##### `callback`

Type: `Function`
Required: `No`

A function executed once the middleware has stopped watching.

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";

const compiler = rspack({
  /* Rspack configuration */
});

const instance = devMiddleware(compiler);

const app = express();

app.use(instance);

setTimeout(() => {
  // Says Rspack to stop watch changes
  instance.close();
}, 1000);
```

### `invalidate(callback)`

Instructs the `@rspack/dev-middleware` instance to recompile the bundle, e.g. after a change to the configuration.

#### Parameters

##### `callback`

Type: `Function`
Required: `No`

A function executed once the middleware has invalidated.

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";

const compiler = rspack({
  /* Rspack configuration */
});

const instance = devMiddleware(compiler);

const app = express();

app.use(instance);

setTimeout(() => {
  // After a short delay the configuration is changed and a banner plugin is added to the config
  new rspack.BannerPlugin("A new banner").apply(compiler);

  // Recompile the bundle with the banner plugin:
  instance.invalidate();
}, 1000);
```

### `waitUntilValid(callback)`

Executes a callback function when the compiler bundle is valid, typically after
compilation.

#### Parameters

##### `callback`

Type: `Function`
Required: `No`

A function executed when the bundle becomes valid.
If the bundle is valid at the time of calling, the callback is executed immediately.

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";

const compiler = rspack({
  /* Rspack configuration */
});

const instance = devMiddleware(compiler);

const app = express();

app.use(instance);

instance.waitUntilValid(() => {
  console.log("Package is in a valid state");
});
```

### `getFilenameFromUrl(url)`

Get filename from URL.

#### Parameters

##### `url`

Type: `String`
Required: `Yes`

URL for the requested file.

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";

const compiler = rspack({
  /* Rspack configuration */
});

const instance = devMiddleware(compiler);

const app = express();

app.use(instance);

instance.waitUntilValid(() => {
  let resolved;

  try {
    resolved = instance.getFilenameFromUrl("/bundle.js");
  } catch (error) {
    console.error(error);
    return;
  }

  if (!resolved) {
    console.log("Not found");
    return;
  }

  console.log(`Filename is ${resolved.filename}`);
});
```

## FAQ

### Avoid blocking requests to non-Rspack resources.

Since `output.publicPath` and `output.filename`/`output.chunkFilename` can be dynamic, it's not possible to know which files are Rspack bundles (and they public paths) and which are not, so we can't avoid blocking requests.

But there is a solution to avoid it - mount the middleware to a non-root route, for example:

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";

const compiler = rspack({
  // Rspack options
});

const app = express();

// Mounting the middleware to the non-root route allows avoids this.
// Note - check your public path, if you want to handle `/dist/`, you need to setup `output.publicPath` to `/` value.
app.use(
  "/dist/",
  devMiddleware(compiler, {
    // @rspack/dev-middleware options
  }),
);

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

## Server-Side Rendering

_Note: this feature is experimental and may be removed or changed completely in the future._

In order to develop an app using server-side rendering, we need access to the
[`stats`](https://rspack.rs/api/javascript-api/stats), which is
generated with each build.

With server-side rendering enabled, `@rspack/dev-middleware` sets the `stats` to `res.locals.rspack.devMiddleware.stats`
and the filesystem to `res.locals.rspack.devMiddleware.outputFileSystem` before invoking the next middleware,
allowing a developer to render the page body and manage the response to clients.

_Note: Requests for bundle files will still be handled by
`@rspack/dev-middleware` and all requests will be pending until the build
process is finished with server-side rendering enabled._

Example Implementation:

```js
import { join } from "node:path";
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";
import isObject from "is-object";

const compiler = rspack({
  /* Rspack configuration */
});

const app = express();

// This function makes server rendering of asset references consistent with different Rspack chunk/entry configurations
function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}

app.use(devMiddleware(compiler, { serverSideRender: true }));

// The following middleware would not be invoked until the latest build is finished.
app.use((req, res) => {
  const { devMiddleware } = res.locals.rspack;
  const { outputFileSystem } = devMiddleware;
  const jsonStats = devMiddleware.stats.toJson();
  const { assetsByChunkName, outputPath } = jsonStats;

  // Then use `assetsByChunkName` for server-side rendering
  // For example, if you have only one main chunk:
  res.send(`
<html>
  <head>
    <title>My App</title>
    <style>
    ${normalizeAssets(assetsByChunkName.main)
      .filter((asset) => asset.endsWith(".css"))
      .map((asset) => outputFileSystem.readFileSync(join(outputPath, asset)))
      .join("\n")}
    </style>
  </head>
  <body>
    <div id="root"></div>
    ${normalizeAssets(assetsByChunkName.main)
      .filter((asset) => asset.endsWith(".js"))
      .map((asset) => `<script src="${asset}"></script>`)
      .join("\n")}
  </body>
</html>
  `);
});
```

## Other servers

Examples of use with other servers will follow here.

### connect-next

[connect-next](https://github.com/rstackjs/connect-next) is an actively maintained fork of Connect.

```js
import { createServer } from "node:http";
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import { connect } from "connect-next";
import rspackConfig from "./rspack.config.js";

const compiler = rspack(rspackConfig);
const devMiddlewareOptions = {
  // options
};
const app = connect();

app.use(devMiddleware(compiler, devMiddlewareOptions));

createServer(app).listen(3000);
```

### Router

```js
import { createServer } from "node:http";
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import finalhandler from "finalhandler";
import Router from "router";
import rspackConfig from "./rspack.config.js";

const compiler = rspack(rspackConfig);
const devMiddlewareOptions = {
  // options
};

// eslint-disable-next-line new-cap
const router = Router();

router.use(devMiddleware(compiler, devMiddlewareOptions));

const server = createServer((req, res) => {
  router(req, res, finalhandler(req, res));
});

server.listen(3000);
```

### Express

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import express from "express";
import rspackConfig from "./rspack.config.js";

const compiler = rspack(rspackConfig);
const devMiddlewareOptions = {
  // options
};
const app = express();

app.use(devMiddleware(compiler, devMiddlewareOptions));

app.listen(3000, () => console.log("Example app listening on port 3000!"));
```

### Koa

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import Koa from "koa";
import rspackConfig from "./rspack.simple.config.js";

const compiler = rspack(rspackConfig);
const devMiddlewareOptions = {
  // options
};
const app = new Koa();

app.use(devMiddleware.koaWrapper(compiler, devMiddlewareOptions));

app.listen(3000);
```

### Hapi

```js
import Hapi from "@hapi/hapi";
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import rspackConfig from "./rspack.config.js";

const compiler = rspack(rspackConfig);
const devMiddlewareOptions = {};

const server = Hapi.server({ port: 3000, host: "localhost" });

await server.register({
  plugin: devMiddleware.hapiWrapper(),
  options: {
    // The `compiler` option is required
    compiler,
    ...devMiddlewareOptions,
  },
});

await server.start();

console.log("Server running on %s", server.info.uri);

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
```

### Hono

```js
import { rspack } from "@rspack/core";
import { devMiddleware } from "@rspack/dev-middleware";
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import rspackConfig from "./rspack.config.js";

const compiler = rspack(rspackConfig);
const devMiddlewareOptions = {
  // options
};

const app = new Hono();

app.use(devMiddleware.honoWrapper(compiler, devMiddlewareOptions));

serve(app);
```

## Credits

This repository is forked from [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware). It adapts the original implementation for the Rspack ecosystem, bridging behavioral differences with webpack while adding Rspack-specific capabilities.

> Thanks to the webpack-dev-middleware maintainers and its original creator, [@sokra](https://github.com/sokra).

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
