import swal from 'sweetalert2';
import * as angular from 'angular';
import { ILocationService } from 'angular';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { MotivosDataService, MotivoDto } from '../motivos';

export class MotivosUpdateController extends BaseClassController {
    private motivoOriginal: MotivoDto;

    public motivoUpdate: MotivoDto;
    public motivoId: number;

    public static $inject: string[] = ['motivosDataService', '$scope', '$location', 'logger'];
    constructor(
        private dataService: MotivosDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger
    ) { super(logger); }

    public $onInit = () => {
        this.getMotivo(this.motivoId);
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private getMotivo = (motivoId: number) => {
        this.ativaCarregando();
        this.dataService
            .getMotivo(motivoId)
            .then(this.getMotivosuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getMotivosuccess = (motivo: MotivoDto) => {
        this.motivoUpdate = motivo;
        this.motivoOriginal = angular.copy(motivo);
    }

    public updateMotivo = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formUpdate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .updateMotivo(this.motivoUpdate.id, this.motivoUpdate)
            .then(() => {
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Motivo editado com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
                this.$location.path('/motivos/listar');
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public cancelUpdate = () => {
        for (var key in this.motivoUpdate) {
            if (this.motivoUpdate.hasOwnProperty(key) && this.motivoOriginal.hasOwnProperty(key)) {
                this.motivoUpdate[key] = this.motivoOriginal[key];
            }
        }
        this.motivoUpdate = null;
        this.$location.path('/motivos/listar');
    }
}