import { InjectionKey } from 'vue';

export function makeContainer() {
  type Dependency<T> = {
    [key: InjectionKey<T>]: () => T;
  };

  let container: Dependency<unknown> = {};

  function register<T>(key: InjectionKey<T>, resolve: () => T) {
    container[key] = resolve;
  }

  function resolve<T>(key: InjectionKey<T>): T {
    return container[key]() as T;
  }

  function reset() {
    container = {};
  }

  return {
    register,
    resolve,
    reset,
  };
}
