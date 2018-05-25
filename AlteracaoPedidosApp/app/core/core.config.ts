import 'angular-local-storage';
import { TransitionService } from '@uirouter/angularjs';
import * as moment from 'moment';
import { IAppSettings } from '../core';

export function showErrorsConfig(showErrorsConfigProvider: any): void {
    showErrorsConfigProvider.showSuccess(true);
}
showErrorsConfig.$inject = ['showErrorsConfigProvider'];

export function runBlock(authService: auth.IAuthService, authz: any, $rootScope: any, appSettings: IAppSettings): void {
    authService.fillAuthData();
    $.each(authService.autenticacao.permissoes, (index: number, permissao: any) => {
        if ($.isNumeric(permissao)) {
            authService.autenticacao.permissoes[index] = permissao.toString();
        }
    });
    authz.setPermissions(authService.autenticacao.permissoes);
    moment.locale('pt-br');
    $rootScope.title = 'Alteração de Filial - Phito Fórmulas v.' + appSettings.versao;
}
runBlock.$inject = ['AuthService', 'authz', '$rootScope', 'appSettings'];

export function runTransition($transitions: TransitionService): void {
    $transitions.onSuccess({}, () => {
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    });
}
runTransition.$inject = ['$transitions'];
