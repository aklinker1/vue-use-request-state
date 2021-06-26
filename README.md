# useRequestState

A tiny utility with no dependencies for tracking the state of async operations

```ts
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const { isLoading, isFailure, wrapRequest, errorMessage } = useRequestState();
    const character = ref();
    const getCharacter = wrapRequest(characterId => {
      const response = await axios.get(`https://swapi.dev/api/people/${characterId}`);
      character.value = response.data;
    });

    return {
      character,
      isLoading,
      isFailure,
      errorMessage,
    };
  },
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

`useRequestState` is the entry point to the library. It returns the set of utilities described below:

- [`wrapRequest`](#wrapRequest)
- `reset`: Sets `requestState = NOT_REQUESTED` and `error = undefined`
- `requestState`: The ref that tracks the state
- `error`: The error that the request throws
- `isLoading`: Computed ref for `requestState === RequestState.LOADING`
- `isSuccess`: Computed ref for `requestState === RequestState.SUCCESS`
- `isFailure`: Computed ref for `requestState === RequestState.FAILURE`
- `isNotRequested`: Computed ref for `requestState === RequestState.NOT_REQUESTED`
- `errorMessage`: Computed ref for the `error.message` or `undefined` if there is no error

#### wrapRequest

Create a function that wraps your async request in a try catch block that updates the `requestState` and `error` on failure or success

```ts
const { wrapRequest } = useRequestState();
const doSomething = wrapRequest(async () => {
  // Perform async operation
});
```
