import * as swal from 'sweetalert';
import * as angular from 'angular';
import { ILocationService } from 'angular';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { ParametrosDataService, ParametroDto } from '../parametros';

export class ParametrosUpdateController extends BaseClassController {
    private parametroOriginal: ParametroDto;

    public parametroUpdate: ParametroDto;
    public parametroId: number;

    public static $inject: string[] = ['parametrosDataService', '$scope', '$location', 'logger'];
    constructor(
        private dataService: ParametrosDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger
    ) { super(logger); }

    public $onInit = () => {
        this.getParametro(this.parametroId);
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private getParametro = (parametroId: number) => {
        this.ativaCarregando();
        this.dataService
            .getParametro(parametroId)
            .then(this.getParametrosuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getParametrosuccess = (parametro: ParametroDto) => {
        this.parametroUpdate = parametro;
        this.parametroOriginal = angular.copy(parametro);
    }

    public updateParametro = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formUpdate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .updateParametro(this.parametroUpdate.id, this.parametroUpdate)
            .then(() => {
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Parâmetro editado com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
                this.$location.path('/parametros/listar');
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public cancelUpdate = () => {
        for (var key in this.parametroUpdate) {
            if (this.parametroUpdate.hasOwnProperty(key) && this.parametroOriginal.hasOwnProperty(key)) {
                this.parametroUpdate[key] = this.parametroOriginal[key];
            }
        }
        this.parametroUpdate = null;
        this.$location.path('/parametros/listar');
    }
}