import swal from 'sweetalert2';
import { IModalServiceInstance } from 'angular-ui-bootstrap';

import { IAppScope } from '../core';
import { IAuthService } from '../auth';
import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { DamDto, DamsDataService } from '../dams';

export class DamsAtenderController extends BaseClassController {
    private modalInstance: IModalServiceInstance;
    private resolve: any;

    public dam: DamDto;
    public posicao: string;

    public static $inject: string[] = ['logger', 'damsDataService', '$scope', 'AuthService'];
    constructor(
        logger: ILogger,
        private damsDataService: DamsDataService,
        private $scope: IAppScope,
        private authService: IAuthService
    ) { super(logger); }

    public $onInit = () => {
        this.dam = this.resolve.dam;
    }

    public finalizarPosicao = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formUpdate.$invalid) { return; }
        this.ativaCarregando();
        this.damsDataService
            .createAtendimento(this.dam.id, this.posicao, this.authService.autenticacao.userId)
            .then(this.finalizarSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private finalizarSuccess = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Posição adicionada com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.modalInstance.close();
    }

    public fecharModal = () => {
        this.posicao = '';
        this.modalInstance.dismiss('cancelar');
    }
}