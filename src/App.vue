<template>
  <router-view />
</template>

<script lang="ts">
import { registerDependencies } from './DIContainer/DIContainer';
import { Router } from 'vue-router';
import { getAppRouter } from './router';

export default {
  name: 'App',
  setup() {
    const router = getAppRouter();
    registerDependencies(router);
    configureRouter(router);
    return { router };
  },
};

// Router Route Validation Setup

import { sharedContainer } from './Domain/Shared/SharedDependencies';
import { tokenLocalRepositoryKey } from './Domain/Shared/SharedDependencies';
import { IsLoggedInUseCase } from './Feature/Navigation/IsLoggedInUseCase';
import { ValidateRouteUseCase } from './Feature/Navigation/ValidateRouteUseCase';

function configureRouter(router: Router) {
  const tokenLocalRepository = sharedContainer.resolve(tokenLocalRepositoryKey);
  const isLoggedInUseCase = new IsLoggedInUseCase(tokenLocalRepository);
  const validateRouteUseCase = new ValidateRouteUseCase(isLoggedInUseCase);

  router.beforeResolve((to, from, next) => {
    //initialRouteMockService('test', '/test').invoke(to, from, next);
    validateRouteUseCase.validate(to, from, next);
  });
}
</script>
