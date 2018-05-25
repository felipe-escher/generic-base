import swal from 'sweetalert2';
import { IModalServiceInstance } from 'angular-ui-bootstrap';

import { IAuthService } from '../auth';
import { IAppScope, IAppSettings } from '../core';
import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { DamDto, DamsDataService } from '../dams';
import { MotivoDto, MotivosDataService } from '../motivos';
import { SolucaoDto, SolucoesDataService } from '../solucoes';

export class DamsFinalizarController extends BaseClassController {
    private modalInstance: IModalServiceInstance;
    private resolve: any;

    public dam: DamDto;
    public motivos: MotivoDto[];
    public solucoes: SolucaoDto[];
    public substituicaoAtivoId: number;

    public static $inject: string[] = ['logger', 'damsDataService', 'motivosDataService', 'solucoesDataService', '$scope', 'appSettings',
        'AuthService'];
    constructor(
        logger: ILogger,
        private damsDataService: DamsDataService,
        private motivosDataService: MotivosDataService,
        private solucoesDataService: SolucoesDataService,
        private $scope: IAppScope,
        appSettings: IAppSettings,
        private authService: IAuthService
    ) {
        super(logger);
        this.substituicaoAtivoId = appSettings.substituicaoAtivoId;
    }

    public $onInit = () => {
        this.dam = this.resolve.dam;
        this.getMotivos();
        this.getSolucoes();
    }

    private getMotivos = () => {
        this.motivosDataService
            .getMotivos()
            .then(motivos => {
                this.motivos = motivos;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getSolucoes = () => {
        this.solucoesDataService
            .getSolucoes()
            .then(solucoes => {
                this.solucoes = solucoes;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public finalizarDam = () => {
        this.$scope.$broadcast('show-errors-check-validity');
        this.dam.solucionadorId = this.authService.autenticacao.userId;

        if (this.$scope.formUpdate.$invalid) { return; }
        this.ativaCarregando();
        this.damsDataService
            .finalizarAtendimento(this.dam.id, this.dam)
            .then(this.finalizarSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private finalizarSuccess = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Dam finalizado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.modalInstance.close();
    }

    public fecharModal = () => {
        this.modalInstance.dismiss('cancelar');
    }
}