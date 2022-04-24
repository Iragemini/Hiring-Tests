## A single Express-based app that serves two separate, unrelated pieces of functionality:

- **In-memory stack (LIFO) provides two endpoints:**
  - an endpoint to add an item to the stack
  - an endpoint to return the top item of the stack
- **In-memory key-value store with TTL:**
  - an endpoint to add a key to the store
    - setting a TTL is optional to the client when adding the key
  - an endpoint to get the value for a key
    - this respects the TTL for the key if provided
  - an endpoint to delete the value stored for a given key
---
### Configuration
- The ***config file*** is located in the ***config folder*** and presents all basic settings.

### Run
```console
    npm install

    npm start
```

### Tests

```console
    npm test
```
