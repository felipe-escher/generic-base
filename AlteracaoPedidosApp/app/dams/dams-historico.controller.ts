import { IModalServiceInstance } from 'angular-ui-bootstrap';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { DamDto } from '../dams';

export class DamsHistoricoController extends BaseClassController {
    private modalInstance: IModalServiceInstance;
    private resolve: any;

    public dam: DamDto;

    public static $inject: string[] = ['logger'];
    constructor(logger: ILogger) { super(logger); }

    public $onInit = () => {
        this.dam = this.resolve.dam;
    }

    public fecharModal = () => {
        this.modalInstance.dismiss('cancelar');
    }
}