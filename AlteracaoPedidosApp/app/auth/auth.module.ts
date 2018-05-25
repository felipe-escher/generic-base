import { module } from 'angular';

import { AuthService } from './auth.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoginComponent } from './login.component';
import { LoginController } from './login.controller';
import states from './auth.states';

export const autenticacaoModule: angular.IModule = module('autenticacao', [])
    .service('AuthService', AuthService)
    .service('AuthInterceptorService', AuthInterceptorService)
    .component('loginComponent', new LoginComponent())
    .controller('loginController', LoginController)
    .config(states);