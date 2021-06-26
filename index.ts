import { computed, ref, Ref, ComputedRef } from 'vue';

export enum RequestState {
  NOT_REQUESTED = 0,
  LOADING = 1,
  SUCCESS = 2,
  FAILURE = 3,
}

interface ComposedRequestState {
  requestState: Ref<RequestState>;
  error: Ref<Error | undefined>;
  isLoading: ComputedRef<boolean>;
  isSuccess: ComputedRef<boolean>;
  isFailure: ComputedRef<boolean>;
  isNotRequested: ComputedRef<boolean>;
  errorMessage: ComputedRef<string | undefined>;
  wrapRequest<T extends (...args: any[]) => void>(
    performRequest: T,
  ): (...args: Parameters<T>) => Promise<void>;
  reset(): void;
}

export default function useRequestState(): ComposedRequestState {
  // State
  const requestState = ref(RequestState.NOT_REQUESTED);

  const isLoading = computed(() => requestState.value === RequestState.LOADING);
  const isSuccess = computed(() => requestState.value === RequestState.SUCCESS);
  const isFailure = computed(() => requestState.value === RequestState.FAILURE);
  const isNotRequested = computed(() => requestState.value === RequestState.NOT_REQUESTED);

  // Errors
  const error = ref<Error | undefined>();
  const errorMessage = computed(() => error.value?.message);

  // Utils
  const wrapRequest =
    <T extends (...args: any[]) => void>(executor: T) =>
    async (...args: Parameters<T>): Promise<void> => {
      requestState.value = RequestState.LOADING;
      error.value = undefined;
      try {
        await executor(...args);
        requestState.value = RequestState.SUCCESS;
      } catch (err) {
        error.value = err;
        requestState.value = RequestState.FAILURE;
      }
    };
  const reset = () => {
    requestState.value = RequestState.NOT_REQUESTED;
    error.value = undefined;
  };

  return {
    requestState,
    isLoading,
    isSuccess,
    isFailure,
    isNotRequested,
    wrapRequest,
    error,
    errorMessage,
    reset,
  };
}
