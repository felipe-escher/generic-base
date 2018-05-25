import { ILocationService } from 'angular';
import { HeaderDataService } from '../header';
import { IAuthService, IAuthenticationData } from '../../auth';
import { IAppSettings } from '../../core';
import { DashboardAtendenteSignalRService } from '../../signalr';

export class HeaderController {
    public autenticacao: IAuthenticationData;
    public versao: string;
    public atendente: boolean;

    public static $inject: string[] = ['$location', 'AuthService', 'appSettings', 'dashboardAtendenteSignalRService', 'authz',
        'headerDataService'];
    constructor(
        private $location: ILocationService,
        private authService: IAuthService,
        appSettings: IAppSettings,
        private dashboardAtendenteSignalRService: DashboardAtendenteSignalRService,
        authz: any,
        public dataService: HeaderDataService
    ) {
        this.autenticacao = authService.autenticacao;
        this.versao = appSettings.versao;
        this.atendente = authz.hasPermission('alteracoes:receber');
    }

    public $onInit = () => {
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();

        if (this.atendente) {
            this.dashboardAtendenteSignalRService.connect();
        }
    }

    public $onDestroy = () => {
        this.dashboardAtendenteSignalRService.close();
    }

    public conectar = () => {
        this.dashboardAtendenteSignalRService.connect();
    }

    public desconectar = () => {
        this.dashboardAtendenteSignalRService.close();
    }

    public logOut: () => void = () => {
        this.authService.logOut();
        this.$location.path('/login');
    }
}