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

- The **_config file_** is located in the **_config folder_** and presents all basic settings.
  - Create `.env` file based on `.env.example`
  - Specify `PORT` and `TTL`
    - `TTL` is optional so `-1` matches no TTL

### Run

```console
    npm install

    npm start
```

### Endpoints

- **Base URL:** `http://localhost:<PORT>`
  
  ---
- **In-memory stack (LIFO) provides two endpoints:**
  - POST `/stack`
  - GET `/stack`
  ### Examples

  ```console
  /* POST request.body */
  {
    "item": "Hello",    //required
  }

  /* response */
  {
    "stackSize": 1
  }

  ```
  ---

- **In-memory key-value store with TTL:**
  - POST `/keyValue`
  - GET `/keyValue/:key`
  - DELETE `/keyValue/:key`
  ### Examples

    ```console
    /* POST request.body */
    {
      "key": "name",    //required
      "value": "John",  //required
      "ttl": 30,        //optional
    }

    /* response */
    {
      "storageSize": 1
    }

    ```
---

### Tests

```console
    npm test
```

