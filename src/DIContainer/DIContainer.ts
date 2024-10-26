import { Router } from 'vue-router';
import { registerSharedDependencies } from './Shared/SharedContainer';
import { registerLoginDependencies } from './Login/LoginContainer';

export const registerDependencies = function (router: Router) {
  registerSharedDependencies();
  registerLoginDependencies(router);
};
