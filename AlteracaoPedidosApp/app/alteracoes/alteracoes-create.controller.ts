import * as swal from 'sweetalert';
import { ILocationService } from 'angular';
import { IAuthService } from '../auth';
import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope, IFilial, IAppSettings, ISetorRequisitante } from '../core';
import { AlteracoesDataService, AlteracaoDto } from '../alteracoes';

export class AlteracoesCreateController extends BaseClassController {
    public alteracao: AlteracaoDto;
    public filiais: IFilial[];
    public setores: ISetorRequisitante[];

    public static $inject: string[] = ['alteracoesDataService', '$scope', '$location', 'logger', 'AuthService', 'appSettings'];
    constructor(
        private dataService: AlteracoesDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger,
        private authService: IAuthService,
        private appSettings: IAppSettings
    ) {
        super(logger);
        this.filiais = this.appSettings.filiais;
        this.setores = this.appSettings.setoresRequisitantes;
    }

    public $onInit = () => {
        this.limparAlteracao();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private limparAlteracao = () => {
        this.alteracao = {
            atendida: false,
            numPedido: '',
            pedidosCadados: '',
            solicitanteId: this.authService.autenticacao.userId,
            dataRecebido: null,
            horarioRetiradaDe: null,
            horarioRetiradaPara: null,
            filialDe: '',
            filialPara: '',
            enderecoEntrega: '',
            motivo: '',
            observacoes: ''
        };
    }

    public createAlteracao = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formCreate.$invalid) { return; }

        if (this.alteracao.filialDe === '' && this.alteracao.filialPara === ''
            && this.alteracao.horarioRetiradaDe === null && this.alteracao.horarioRetiradaPara === null
            && this.alteracao.enderecoEntrega === '') {
                return;
        }

        this.ativaCarregando();
        this.dataService
            .createAlteracao(this.alteracao)
            .then(this.createSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private createSuccess = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Alteração de pedido adicionada com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.$location.path('/alteracoes/listar');
    }

    public cancelCreate = () => {
        this.limparAlteracao();
        this.$location.path('/alteracoes/listar');
    }
}