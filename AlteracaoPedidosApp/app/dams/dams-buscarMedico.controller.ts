import { IModalServiceInstance } from 'angular-ui-bootstrap';

import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { DamsDataService, FcertaMedicoDto } from '../dams';

export class DamsBuscarMedicoController extends BaseClassController {
    private modalInstance: IModalServiceInstance;
    private resolve: any;

    public busca: string;
    public medicos: FcertaMedicoDto[];

    public static $inject: string[] = ['logger', 'damsDataService'];
    constructor(
        logger: ILogger,
        private damsDataService: DamsDataService
    ) { super(logger); }

    public $onInit = () => {
        this.busca = this.resolve.busca;
        this.buscarMedicos();
    }

    public buscarMedicos = () => {
        if (this.busca !== '') {
            this.ativaCarregando();
            this.damsDataService
                .getMedicos(this.busca)
                .then(medicos => {
                    this.medicos = medicos;
                })
                .catch(this.callbackFail)
                .finally(this.desativaCarregando);
        }
    }

    public selecionarMedico = (medico: FcertaMedicoDto) => {
        this.modalInstance.close(medico);
    }

    public fecharModal = () => {
        this.modalInstance.dismiss('cancelar');
    }
}