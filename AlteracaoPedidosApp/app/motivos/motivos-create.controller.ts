import swal from 'sweetalert2';
import { ILocationService } from 'angular';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { MotivosDataService, MotivoDto } from '../motivos';

export class MotivosCreateController extends BaseClassController {
    public motivo: MotivoDto;

    public static $inject: string[] = ['motivosDataService', '$scope', '$location', 'logger'];
    constructor(
        private dataService: MotivosDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger
    ) { super(logger); }

    public $onInit = () => {
        this.limparMotivo();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private limparMotivo = () => {
        this.motivo = {
            descricao: '',
            ativo: true
        };
    }

    public createMotivo = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formCreate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .createMotivo(this.motivo)
            .then(this.createSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private createSuccess = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Motivo adicionado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.$location.path('/motivos/listar');
    }

    public cancelCreate = () => {
        this.limparMotivo();
        this.$location.path('/motivos/listar');
    }
}