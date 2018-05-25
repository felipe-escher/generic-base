import swal from 'sweetalert2';
import { BaseClassController } from '../core/base.class';

import { ILogger } from '../logger';
import { SolucoesDataService, SolucaoDto } from '../solucoes';

export class SolucoesListController extends BaseClassController {
    public exibir: string;
    public solucoes: SolucaoDto[];
    public solucaoIdDelete: number;

    public static $inject: string[] = ['solucoesDataService', 'logger'];
    constructor(private dataService: SolucoesDataService, logger: ILogger) {
        super(logger);
        this.exibir = 'Ativos';
    }

    public $onInit = () => {
        this.getSolucoes();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    public exibirTodos = () => {
        this.exibir = 'Todos';
        this.getSolucoes();
    }

    public exibirAtivos = () => {
        this.exibir = 'Ativos';
        this.getSolucoes();
    }

    public getSolucoes = () => {
        this.ativaCarregando();
        if (this.exibir === 'Ativos') {
            this.dataService
                .getSolucoes()
                .then(solucoes => {
                    this.solucoes = solucoes;
                })
                .catch(this.callbackFail)
                .finally(this.desativaCarregando);
        } else {
            this.dataService
                .getSolucoesComInativos()
                .then(solucoes => {
                    this.solucoes = solucoes;
                })
                .catch(this.callbackFail)
                .finally(this.desativaCarregando);
        }
    }

    public exibeDelete = (solucao: SolucaoDto) => {
        swal({
            title: 'Tem certeza que deseja deletar a solução?',
            html: 'Essa operação não pode ser desfeita! <br />'
            + ' Solução: ' + solucao.descricao,
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Deletar!',
            confirmButtonColor: '#DD6B55',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                this.deleteSolucao(solucao.id);
            }
        });
    }

    public deleteSolucao = (solucaoId: number) => {
        this.solucaoIdDelete = solucaoId;
        this.ativaCarregando();
        this.dataService
            .deleteSolucao(solucaoId)
            .then(this.deleteSolucaoResult)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private deleteSolucaoResult = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Solução deletada com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.solucoes = $.grep(this.solucoes, (e: SolucaoDto) => {
            return e.id !== this.solucaoIdDelete;
        });
        this.solucaoIdDelete = null;
    }
}