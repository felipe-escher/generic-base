import * as swal from 'sweetalert';
import { ILocationService } from 'angular';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { ParametrosDataService, ParametroDto } from '../parametros';

export class ParametrosCreateController extends BaseClassController {
    public parametro: ParametroDto;

    public static $inject: string[] = ['parametrosDataService', '$scope', '$location', 'logger'];
    constructor(
        private dataService: ParametrosDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger
    ) { super(logger); }

    public $onInit = () => {
        this.limparParametro();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private limparParametro = () => {
        this.parametro = {
            nome: '',
            argumento: '',
            descricao: ''
        };
    }

    public createParametro = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formCreate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .createParametro(this.parametro)
            .then(this.createSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private createSuccess = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Parâmetro adicionado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.$location.path('/parametros/listar');
    }

    public cancelCreate = () => {
        this.limparParametro();
        this.$location.path('/parametros/listar');
    }
}