import swal from 'sweetalert2';
import { ILocationService } from 'angular';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { SolucoesDataService, SolucaoDto } from '../solucoes';

export class SolucoesCreateController extends BaseClassController {
    public solucao: SolucaoDto;

    public static $inject: string[] = ['solucoesDataService', '$scope', '$location', 'logger'];
    constructor(
        private dataService: SolucoesDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger
    ) { super(logger); }

    public $onInit = () => {
        this.limparSolucao();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private limparSolucao = () => {
        this.solucao = {
            descricao: '',
            ativo: true
        };
    }

    public createSolucao = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formCreate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .createSolucao(this.solucao)
            .then(this.createSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private createSuccess = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Solução adicionada com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.$location.path('/solucoes/listar');
    }

    public cancelCreate = () => {
        this.limparSolucao();
        this.$location.path('/solucoes/listar');
    }
}