# @apollo/client Issue #8063

Minimal reproduction repository for `@apollo/client` [issue #8063](https://github.com/apollographql/apollo-client/issues/8063).
Uses Mock Service Worker (MSW) to intercept requests in the browser and
reproduce the error without having to spin up a separate server.

To start:

```
yarn
yarn dev
```

Observe that the second query reads from cache and returns `undefined`. You can
verify that this is not a network or MSW error by checking the MSW console logs
and inspecting the network tab in devtools.
