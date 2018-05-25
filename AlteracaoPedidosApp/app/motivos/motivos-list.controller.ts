import swal from 'sweetalert2';
import { BaseClassController } from '../core/base.class';

import { ILogger } from '../logger';
import { MotivosDataService, MotivoDto } from '../motivos';

export class MotivosListController extends BaseClassController {
    public exibir: string;
    public motivos: MotivoDto[];
    public motivoIdDelete: number;

    public static $inject: string[] = ['motivosDataService', 'logger'];
    constructor(private dataService: MotivosDataService, logger: ILogger) {
        super(logger);
        this.exibir = 'Ativos';
    }

    public $onInit = () => {
        this.getMotivos();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    public exibirTodos = () => {
        this.exibir = 'Todos';
        this.getMotivos();
    }

    public exibirAtivos = () => {
        this.exibir = 'Ativos';
        this.getMotivos();
    }

    public getMotivos = () => {
        this.ativaCarregando();
        if (this.exibir === 'Ativos') {
            this.dataService
                .getMotivos()
                .then(motivos => {
                    this.motivos = motivos;
                })
                .catch(this.callbackFail)
                .finally(this.desativaCarregando);
        } else {
            this.dataService
                .getMotivosComInativos()
                .then(motivos => {
                    this.motivos = motivos;
                })
                .catch(this.callbackFail)
                .finally(this.desativaCarregando);
        }
    }

    public exibeDelete = (motivo: MotivoDto) => {
        swal({
            title: 'Tem certeza que deseja deletar o motivo?',
            html: 'Essa operação não pode ser desfeita! <br />'
            + ' Motivo: ' + motivo.descricao,
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Deletar!',
            confirmButtonColor: '#DD6B55',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.deleteMotivo(motivo.id);
            }
        });
    }

    public deleteMotivo = (motivoId: number) => {
        this.motivoIdDelete = motivoId;
        this.ativaCarregando();
        this.dataService
            .deleteMotivo(motivoId)
            .then(this.deleteMotivoResult)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private deleteMotivoResult = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Motivo deletado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.motivos = $.grep(this.motivos, (e: MotivoDto) => {
            return e.id !== this.motivoIdDelete;
        });
        this.motivoIdDelete = null;
    }
}