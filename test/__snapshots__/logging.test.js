// Jest Snapshot v1, https://jestjs.io/docs/snapshot-testing

exports[`logging should logging an error in "watch" method: stderr 1`] = `"Error: Watch error"`;

exports[`logging should logging an warning: stderr 1`] = `""`;

exports[`logging should logging an warning: stdout 1`] = `
"WARNING in ⚠ Warning


Rspack compiled with 1 warning"
`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #2: stderr 1`] = `""`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #2: stdout 1`] = `
"broken:
ERROR in ./broken.js
× Module parse failed:
╰─▶ × JavaScript parse error: Expected ';', '}' or <eof>
╭────
1 │ 1()2()3()
· ─
╰────

help:
You may need an appropriate loader to handle this file type.


broken (Rspack 2.0.0-beta.5) compiled with 1 error in x ms

warning:
WARNING in ⚠ Warning


warning (Rspack 2.0.0-beta.5) compiled with 1 warning in x ms

success:
success (Rspack 2.0.0-beta.5) compiled successfully in x ms"
`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #3: stderr 1`] = `""`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #3: stdout 1`] = `
"ERROR in ./broken.js
× Module parse failed:
╰─▶ × JavaScript parse error: Expected ';', '}' or <eof>
╭────
1 │ 1()2()3()
· ─
╰────

help:
You may need an appropriate loader to handle this file type.


Rspack 2.0.0-beta.5 compiled with 1 error in x ms

WARNING in ⚠ Warning


Rspack 2.0.0-beta.5 compiled with 1 warning in x ms

Rspack 2.0.0-beta.5 compiled successfully in x ms"
`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #4: stderr 1`] = `""`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #4: stdout 1`] = `
"ERROR in ./broken.js
× Module parse failed:
╰─▶ × JavaScript parse error: Expected ';', '}' or <eof>
╭────
1 │ 1()2()3()
· ─
╰────

help:
You may need an appropriate loader to handle this file type.


Rspack 2.0.0-beta.5 compiled with 1 error in x ms

WARNING in ⚠ Warning


Rspack 2.0.0-beta.5 compiled with 1 warning in x ms

asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)"
`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #5: stderr 1`] = `""`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration #5: stdout 1`] = `
"Rspack 2.0.0-beta.5 compiled successfully in x ms

Rspack 2.0.0-beta.5 compiled successfully in x ms"
`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration: stderr 1`] = `""`;

exports[`logging should logging in multi-compiler and respect the "stats" option from configuration: stdout 1`] = `
"ERROR in ./broken.js
× Module parse failed:
╰─▶ × JavaScript parse error: Expected ';', '}' or <eof>
╭────
1 │ 1()2()3()
· ─
╰────

help:
You may need an appropriate loader to handle this file type.


Rspack 2.0.0-beta.5 compiled with 1 error in x ms

WARNING in ⚠ Warning


Rspack 2.0.0-beta.5 compiled with 1 warning in x ms

Rspack 2.0.0-beta.5 compiled successfully in x ms"
`;

exports[`logging should logging on successfully build and respect colors #2: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect colors #2: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully build and respect colors: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect colors: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully build and respect the "NO_COLOR" env: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect the "NO_COLOR" env: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with custom object value: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with custom object value: stdout 1`] = `
"asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)"
`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "false" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "false" value: stdout 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "minimal" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "minimal" value: stdout 1`] = `
"x assets
x modules
Rspack 2.0.0-beta.5 compiled successfully in x ms"
`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "none" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "none" value: stdout 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "true" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "true" value: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "verbose" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build and respect the "stats" option from configuration with the "verbose" value: stdout 1`] = `
"PublicPath: auto
asset svg.svg x KiB ({main}) [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB {main} [emitted] (name: main)
asset index.html x bytes ({main}) [emitted] [from: index.html] (auxiliary name: main)
Entrypoint main x KiB = bundle.js
chunk {main} (runtime: main) bundle.js (xxxx) x bytes (xxxx) x KiB (xxxx) [entry] [rendered]
> ./foo.js main
./foo.js x bytes {main} [depth 0] [built] [code generated]
[used exports unknown]
entry ./foo.js
./index.html x bytes {main} [depth 1] [dependent] [built] [code generated]
[exports: default]
[used exports unknown]
cjs require ./index.html [./foo.js] ./foo.js 4:9-23
./svg.svg x bytes {main} [depth 1] [dependent] [built] [code generated]
[exports: default]
[used exports unknown]
cjs require ./svg.svg [./foo.js] ./foo.js 3:9-20


LOG from xxx"
`;

exports[`logging should logging on successfully build in multi-compiler mode: stderr 1`] = `""`;

exports[`logging should logging on successfully build in multi-compiler mode: stdout 1`] = `
"Rspack 2.0.0-beta.5 compiled successfully in x ms

Rspack 2.0.0-beta.5 compiled successfully in x ms"
`;

exports[`logging should logging on successfully build using the "stats" option for middleware with object value and no colors: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with object value and no colors: stdout 1`] = `
"asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)"
`;

exports[`logging should logging on successfully build using the "stats" option for middleware with object value: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with object value: stdout 1`] = `
"asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)"
`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "false" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "false" value: stdout 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "none" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "none" value: stdout 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "normal" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "normal" value: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "true" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "true" value: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "verbose" value: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the "verbose" value: stdout 1`] = `
"PublicPath: auto
asset svg.svg x KiB ({main}) [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB {main} [emitted] (name: main)
asset index.html x bytes ({main}) [emitted] [from: index.html] (auxiliary name: main)
Entrypoint main x KiB = bundle.js
chunk {main} (runtime: main) bundle.js (xxxx) x bytes (xxxx) x KiB (xxxx) [entry] [rendered]
> ./foo.js main
./foo.js x bytes {main} [depth 0] [built] [code generated]
[used exports unknown]
entry ./foo.js
./index.html x bytes {main} [depth 1] [dependent] [built] [code generated]
[exports: default]
[used exports unknown]
cjs require ./index.html [./foo.js] ./foo.js 4:9-23
./svg.svg x bytes {main} [depth 1] [dependent] [built] [code generated]
[exports: default]
[used exports unknown]
cjs require ./svg.svg [./foo.js] ./foo.js 3:9-20


LOG from xxx"
`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the object value and colors: stderr 1`] = `""`;

exports[`logging should logging on successfully build using the "stats" option for middleware with the object value and colors: stdout 1`] = `
"asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)"
`;

exports[`logging should logging on successfully build when the 'stats' doesn't exist: stderr 1`] = `""`;

exports[`logging should logging on successfully build when the 'stats' doesn't exist: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully build: stderr 1`] = `""`;

exports[`logging should logging on successfully build: stdout 1`] = `"Rspack 2.0.0-beta.5 compiled successfully in x ms"`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with object value and colors: stderr 1`] = `""`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with object value and colors: stdout 1`] = `
"asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)

asset bundle.js x bytes [emitted] (name: main)"
`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with object value and no colors: stderr 1`] = `""`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with object value and no colors: stdout 1`] = `
"asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)

asset bundle.js x bytes [emitted] (name: main)"
`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the "false" value: stderr 1`] = `""`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the "false" value: stdout 1`] = `""`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the "normal" value: stderr 1`] = `""`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the "normal" value: stdout 1`] = `
"Rspack 2.0.0-beta.5 compiled successfully in x ms

Rspack 2.0.0-beta.5 compiled successfully in x ms"
`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the "true" value: stderr 1`] = `""`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the "true" value: stdout 1`] = `
"Rspack 2.0.0-beta.5 compiled successfully in x ms

Rspack 2.0.0-beta.5 compiled successfully in x ms"
`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the object value: stderr 1`] = `""`;

exports[`logging should logging on successfully multi-compiler build using the "stats" option for middleware with the object value: stdout 1`] = `
"asset svg.svg x KiB [emitted] [from: svg.svg] (auxiliary name: main)
asset bundle.js x KiB [emitted] (name: main)
asset index.html x bytes [emitted] [from: index.html] (auxiliary name: main)

asset bundle.js x bytes [emitted] (name: main)"
`;

exports[`logging should logging on unsuccessful build in multi-compiler: stderr 1`] = `""`;

exports[`logging should logging on unsuccessful build in multi-compiler: stdout 1`] = `
"ERROR in ./broken.js
× Module parse failed:
╰─▶ × JavaScript parse error: Expected ';', '}' or <eof>
╭────
1 │ 1()2()3()
· ─
╰────

help:
You may need an appropriate loader to handle this file type.


Rspack compiled with 1 error

ERROR in ./broken.js
× Module parse failed:
╰─▶ × JavaScript parse error: Expected ';', '}' or <eof>
╭────
1 │ 1()2()3()
· ─
╰────

help:
You may need an appropriate loader to handle this file type.


Rspack compiled with 1 error"
`;

exports[`logging should logging on unsuccessful build: stderr 1`] = `""`;

exports[`logging should logging on unsuccessful build: stdout 1`] = `
"ERROR in ./broken.js
× Module parse failed:
╰─▶ × JavaScript parse error: Expected ';', '}' or <eof>
╭────
1 │ 1()2()3()
· ─
╰────

help:
You may need an appropriate loader to handle this file type.


Rspack compiled with 1 error"
`;

exports[`logging should logging warnings in multi-compiler mode: stderr 1`] = `""`;

exports[`logging should logging warnings in multi-compiler mode: stdout 1`] = `
"WARNING in ⚠ Warning


Rspack compiled with 1 warning

WARNING in ⚠ Warning


Rspack compiled with 1 warning"
`;
