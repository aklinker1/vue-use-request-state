# useRequestState

A tiny utility with no dependencies for tracking the state of async operations

```ts
const { isLoading, isFailure, wrapRequest, errorMessage } = useRequestState();
const character = ref();

const fetchCharacter = wrapRequest(characterId => {
  const response = await axios.get(`https://swapi.dev/api/people/${characterId}`);
  character.value = response.data;
});

// or return a value

const getCharacter = wrapRequest(characterId => {
  const response = await axios.get(`https://swapi.dev/api/people/${characterId}`);
  return response.data;
});
```

## API

### RequestState

```ts
import { RequestState } from 'vue-use-request-state';
```

The enum that represents the request state. There are 4 values:

- `NOT_REQUESTED = 0`
- `LOADING = 1`
- `SUCCESS = 2`
- `FAILURE = 3`

### useRequestState

```ts
import useRequestState from 'vue-use-request-state';
```

`useRequestState` is the entry point to the library. It returns a bunch of utilities and computed values:

- [`wrapRequest`](#wrapRequest)
- `reset`: A function that resets the request state to`NOT_REQUESTED` and the error to `undefined`
- `requestState`: The current request state
- `error`: The error that the wrapped request throws
- `isLoading`: Computed ref to check if the request state is `LOADING`
- `isSuccess`: Computed ref to check if the request state is `SUCCESS`
- `isFailure`: Computed ref to check if the request state is `FAILURE`
- `isNotRequested`: Computed ref to check if the request state is `NOT_REQUESTED`
- `errorMessage`: Computed ref for the `error.message` or `undefined` if there is no error

#### wrapRequest

Create a function that wraps your async request in a try catch block that updates the `requestState` and `error` on failure or success

```ts
const { wrapRequest: wrapDoSomething } = useRequestState();

const doSomething = wrapDoSomething(async () => {
  // Await your async operation
});
```

> You don't need to include a try catch block, but you could if you needed extra logic. Keep in mind the request state is only set to `FAILURE` when an error is an uncaught error thrown inside the callback.
