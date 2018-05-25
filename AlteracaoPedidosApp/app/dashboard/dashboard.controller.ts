import * as moment from 'moment';
import { BaseClassController } from '../core/base.class';
import { ILogger } from '../logger';
import { DashboardDataService } from '../dashboard';
import { AlteracaoDto, AlteracoesDataService, AlteracoesPorSetor, AlteracoesPorAtendentes } from '../alteracoes';

export class DashboardController extends BaseClassController {
    public dataDePickOpen: boolean;
    public dataAtePickOpen: boolean;
    public novasAlteracoes: AlteracaoDto[];
    public alteracoesFinalizando: AlteracaoDto[];
    public alteracoesPorSetor: AlteracoesPorSetor[];
    public alteracoesPorAtendentes: AlteracoesPorAtendentes[];

    public static $inject: string[] = ['logger', 'dashboardDataService', 'uibDateParser', 'alteracoesDataService'];
    constructor(
        logger: ILogger,
        private dataService: DashboardDataService,
        private uibDateParser: any,
        private alteracoesDataService: AlteracoesDataService
    ) {
        super(logger);
        this.novasAlteracoes = [];
        this.alteracoesFinalizando = [];
        this.alteracoesPorAtendentes = [];
    }

    public $onInit = () => {
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();

        if (this.dataService.dataDe === undefined || this.dataService.dataAte === undefined) {
            this.dataService.dataDe = this.uibDateParser.parse(moment().startOf('month').toDate(), 'yyyy-MM-dd');
            this.dataService.dataAte = this.uibDateParser.parse(moment().endOf('day').toDate(), 'yyyy-MM-dd');
        }

        this.getAlteracoesAguardando();
    }

    public getDadosDashboard = () => {
        this.getAlteracoesPorSetor();
    }

    public getAlteracoesAguardando = () => {
        this.ativaCarregando();
        this.alteracoesDataService.getAlteracoesAguardando()
            .then(alteracoes => {
                this.novasAlteracoes = alteracoes;
                this.getAlteracoesAguardandoFinalizacao();
            })
            .catch(this.callbackFail);
    }

    public getAlteracoesAguardandoFinalizacao = () => {
        this.alteracoesDataService.getAlteracoesAguardandoFinalizacao()
            .then(alteracoes => {
                this.alteracoesFinalizando = alteracoes;
                this.getAlteracoesPorSetor();
            })
            .catch(this.callbackFail);
    }

    public getAlteracoesPorSetor = () => {
        var parametros: any = {
            DataDe: this.dataService.dataDe,
            DataAte: this.dataService.dataAte
        };
        this.alteracoesDataService.buscarDashboard(parametros)
            .then(dashboard => {
                dashboard.alteracoesPorSetor.forEach((alteracao) => {
                    alteracao.setorRequisitanteNome = this.alteracoesDataService.setorRequisitanteNome(alteracao.setorRequisitante);
                });
                this.alteracoesPorSetor = dashboard.alteracoesPorSetor;
                this.alteracoesPorAtendentes = dashboard.alteracoesPorAtendentes;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public dataDePick: () => void = () => {
        this.dataDePickOpen = true;
    }

    public dataAtePick: () => void = () => {
        this.dataAtePickOpen = true;
    }

    public imprimir = () => {
        window.print();
    }
}