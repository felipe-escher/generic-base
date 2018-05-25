import swal from 'sweetalert2';
import * as angular from 'angular';
import { ILocationService } from 'angular';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { SolucoesDataService, SolucaoDto } from '../solucoes';

export class SolucoesUpdateController extends BaseClassController {
    private solucaoOriginal: SolucaoDto;

    public solucaoUpdate: SolucaoDto;
    public solucaoId: number;

    public static $inject: string[] = ['solucoesDataService', '$scope', '$location', 'logger'];
    constructor(
        private dataService: SolucoesDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger
    ) { super(logger); }

    public $onInit = () => {
        this.getSolucao(this.solucaoId);
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private getSolucao = (solucaoId: number) => {
        this.ativaCarregando();
        this.dataService
            .getSolucao(solucaoId)
            .then(this.getSolucoesuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getSolucoesuccess = (solucao: SolucaoDto) => {
        this.solucaoUpdate = solucao;
        this.solucaoOriginal = angular.copy(solucao);
    }

    public updateSolucao = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formUpdate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .updateSolucao(this.solucaoUpdate.id, this.solucaoUpdate)
            .then(() => {
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Solução editada com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
                this.$location.path('/solucoes/listar');
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public cancelUpdate = () => {
        for (var key in this.solucaoUpdate) {
            if (this.solucaoUpdate.hasOwnProperty(key) && this.solucaoOriginal.hasOwnProperty(key)) {
                this.solucaoUpdate[key] = this.solucaoOriginal[key];
            }
        }
        this.solucaoUpdate = null;
        this.$location.path('/solucoes/listar');
    }
}