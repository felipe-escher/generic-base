import * as swal from 'sweetalert';
import { IRootScopeService } from 'angular';
import { IAppSettings } from '../core';
import { HeaderDataService } from '../layout/header';
import { IAuthService } from '../auth';

export class DashboardAtendenteSignalRService {
    private $rootScope: IRootScopeService;
    private authService: IAuthService;
    private headerDataService: HeaderDataService;
    private hubFactory: ngSignalr.HubFactory;
    private logger: logger.ILogger;
    private serviceUrl: string;
    private signalRHub: ngSignalr.Hub;
    private webNotification: any;

    public userId: number;

    public static $inject: string[] = ['appSettings', 'Hub', 'webNotification', 'headerDataService', '$rootScope', 'AuthService', 'logger'];
    constructor(appSettings: IAppSettings, hub: ngSignalr.HubFactory, webNotification: any, headerDataService: HeaderDataService,
        $rootScope: IRootScopeService, authService: IAuthService, logger: logger.ILogger) {
        this.$rootScope = $rootScope;
        this.headerDataService = headerDataService;
        this.hubFactory = hub;
        this.logger = logger;
        this.serviceUrl = appSettings.apiServiceBaseUri + '/signalr/';
        this.signalRHub = null;
        this.webNotification = webNotification;
        this.authService = authService;
        this.init();
    }

    public init = () => {
        var hubOptions: ngSignalr.HubOptions = {
            listeners: {
                'novaAlteracaoIncluida': () => {
                    this.notificarNovaAlteracao();
                }
            },
            logging: false,
            rootPath: this.serviceUrl,
            queryParams: {
                'userId': this.authService.autenticacao.userId.toString()
            },
            stateChanged: (state: SignalR.StateChanged) => {
                switch (state.newState) {
                    case $.signalR.connectionState.connected:
                        this.headerDataService.atendenteConectado = true;
                        this.$rootScope.$apply();
                        break;
                    case $.signalR.connectionState.disconnected:
                        this.headerDataService.atendenteConectado = false;
                        break;
                }
            }
        };
        this.signalRHub = new this.hubFactory('dashboardAtendenteHub', hubOptions);
    }

    public connect = () => {
        this.signalRHub.connect();
    }

    public close = () => {
        this.signalRHub.disconnect();
    }

    public notificarNovaAlteracao = () => {
        this.webNotification.showNotification('Nova Alteração Filial', {
            body: 'Uma nova alteração de filial está aguardando atendimento!',
            icon: 'assets/img/icone_phito.png'
        }, (error: any) => {
            if (error) {
                this.logger.log('Não foi possivel enviar notificação' + error.message);
            }
        });
        this.$rootScope.$evalAsync();
    }

    protected callbackFail: (erro: any) => void = (erro: any) => {
        this.logger.log(erro.data);
        if (erro.status === 304) {
            swal({
                showConfirmButton: false,
                title: 'Sem alterações!',
                text: 'Nenhuma alteração realizada.',
                timer: 2000,
                type: 'warning'
            });
        } else {
            this.logger.log(erro.data);
            swal({
                title: 'Erro!',
                text: erro.data.exceptionMessage,
                type: 'error'
            });
        }
    }
}
