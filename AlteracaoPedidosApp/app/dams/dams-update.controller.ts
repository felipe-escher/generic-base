import swal from 'sweetalert2';
import * as angular from 'angular';
import { ILocationService } from 'angular';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { DamsDataService, DamDto } from '../dams';

export class DamsUpdateController extends BaseClassController {
    private damOriginal: DamDto;

    public damUpdate: DamDto;
    public damId: number;

    public static $inject: string[] = ['damsDataService', '$scope', '$location', 'logger'];
    constructor(
        private dataService: DamsDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger
    ) { super(logger); }

    public $onInit = () => {
        this.getDam(this.damId);
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private getDam = (damId: number) => {
        this.ativaCarregando();
        this.dataService
            .getDam(damId)
            .then(this.getDamsuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getDamsuccess = (dam: DamDto) => {
        this.damUpdate = dam;
        this.damOriginal = angular.copy(dam);
    }

    public updateDam = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formUpdate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .updateDam(this.damUpdate.id, this.damUpdate)
            .then(() => {
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Dam editado com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
                this.$location.path('/dams/detalhar/' + this.damId);
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public cancelUpdate = () => {
        for (var key in this.damUpdate) {
            if (this.damUpdate.hasOwnProperty(key) && this.damOriginal.hasOwnProperty(key)) {
                this.damUpdate[key] = this.damOriginal[key];
            }
        }
        this.damUpdate = null;
        this.$location.path('/dams/detalhar/' + this.damId);
    }
}