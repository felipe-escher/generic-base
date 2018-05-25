import * as swal from 'sweetalert';
import { IModalServiceInstance } from 'angular-ui-bootstrap';
import { BaseClassController } from '../core/base.class';
import { AlteracoesDataService } from '../alteracoes';
import { ILogger } from '../logger';

export class AlteracoesObservacoesController extends BaseClassController {
    private modalInstance: IModalServiceInstance;
    private resolve: any;

    public alteracaoId: number;
    public observacoes: string;

    public static $inject: string[] = ['alteracoesDataService', 'logger'];
    constructor(
        private dataService: AlteracoesDataService,
        logger: ILogger
    ) {
        super(logger);
    }

    public $onInit = () => {
        this.alteracaoId = this.resolve.alteracaoId;
        this.observacoes = this.resolve.observacoes;
    }

    public updateAlteracao = () => {
        this.ativaCarregando();
        this.dataService
            .updateObservacoes(this.alteracaoId, this.observacoes)
            .then(this.updateSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private updateSuccess = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Alteração atualizada com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.modalInstance.close();
    }

    public fecharModal = () => {
        this.modalInstance.dismiss('cancelar');
    }
}