import 'bootstrap';
import 'angular-ui-bootstrap';
import 'AdminLte';
import 'evitarLink';
import 'ui.bootstrap.showErrors';

import * as angular from 'angular';
import { core } from './core/core.module';
import { autenticacaoModule } from './auth/auth.module';
import { layout } from './layout/layout.module';
import { logger } from './logger/logger.module';
import { dashboardModule } from './dashboard/dashboard.module';
import { parametrosModule } from './parametros/parametros.module';
import { usuariosModule } from './usuarios/usuarios.module';
import { alteracoesModule } from './alteracoes/alteracoes.module';
import { signalRModule } from './signalr/signalr.module';

export const alteracaoApp: ng.IModule = angular.module('alteracaoApp', [
    core.name,
    autenticacaoModule.name,
    layout.name,
    logger.name,
    dashboardModule.name,
    parametrosModule.name,
    usuariosModule.name,
    alteracoesModule.name,
    signalRModule.name
]);

carregaConfiguracao().then(bootstrap);

function carregaConfiguracao(): ng.IPromise<void> {
    let initInjector: ng.auto.IInjectorService = angular.injector(['ng']);
    let $http: ng.IHttpService = initInjector.get<ng.IHttpService>('$http');
    return $http.get('parametros.json').then((response: ng.IHttpPromiseCallbackArg<{}>) => {
        alteracaoApp.constant('appSettings', response.data);
    }, (errorResponse: any) => {
        alert(errorResponse);
    });
}

function bootstrap(): void {
    angular.element(document).ready(() => {
        angular.bootstrap(document, ['alteracaoApp']);
    });
}