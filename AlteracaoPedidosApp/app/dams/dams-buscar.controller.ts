import * as moment from 'moment';
import { BaseClassController } from '../core/base.class';

import { IAppScope } from '../core';
import { ILogger } from '../logger';
import { DamsDataService, DamDto, ParametrosBusca } from '../dams';
import { UsuarioDto, UsuariosDataService } from '../usuarios';
import { MotivoDto, MotivosDataService } from '../motivos';
import { SolucaoDto, SolucoesDataService } from '../solucoes';

export class DamsBuscarController extends BaseClassController {
    public atendenteId: number;
    public damId: number;
    public dams: DamDto[];
    public dataDePickOpen: boolean;
    public dataAtePickOpen: boolean;
    public medico: string;
    public paciente: string;
    public solucaoId: number;
    public solucionadorId: number;
    public motivoId: number;

    public listaUsuarios: UsuarioDto[];
    public listaMotivos: MotivoDto[];
    public listaSolucoes: SolucaoDto[];

    public static $inject: string[] = ['damsDataService', 'logger', 'uibDateParser', '$scope', 'usuariosDataService',
    'motivosDataService', 'solucoesDataService'];
    constructor(
        private dataService: DamsDataService,
        logger: ILogger,
        uibDateParser: any,
        private $scope: IAppScope,
        private usuariosDataService: UsuariosDataService,
        private motivosDataService: MotivosDataService,
        private solucoesDataService: SolucoesDataService
    ) {
        super(logger);
        this.motivoId = 0;
        this.solucaoId = 0;
        this.atendenteId = 1;
        this.solucionadorId = 1;

        if (this.dataService.dataDe === undefined || this.dataService.dataAte === undefined) {
            this.dataService.dataDe = uibDateParser.parse(moment().startOf('month').toDate(), 'yyyy-MM-dd');
            this.dataService.dataAte = uibDateParser.parse(moment().endOf('month').toDate(), 'yyyy-MM-dd');
        }
    }

    public $onInit = () => {
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
        this.getMotivos();
        this.getSolucoes();
        this.getUsuarios();
    }

    private getMotivos = () => {
        this.ativaCarregando();
        this.motivosDataService
            .getMotivos()
            .then(motivos => {
                this.listaMotivos = motivos;
                this.listaMotivos.push({
                    id: 0,
                    descricao: 'Todos',
                    ativo: true
                });
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getSolucoes = () => {
        this.ativaCarregando();
        this.solucoesDataService
            .getSolucoes()
            .then(solucoes => {
                this.listaSolucoes = solucoes;
                this.listaSolucoes.push({
                    id: 0,
                    descricao: 'Todas',
                    ativo: true
                });
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getUsuarios = () => {
        this.ativaCarregando();
        this.usuariosDataService
            .getUsuarios()
            .then(usuarios => {
                this.listaUsuarios = usuarios;
                this.listaUsuarios.push({
                    id: 1,
                    nome: 'Todas',
                    ativo: true
                });
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public dataDePick = () => {
        this.dataDePickOpen = true;
    }

    public dataAtePick = () => {
        this.dataAtePickOpen = true;
    }

    public buscarDams = () => {
        if (this.$scope.formBuscar.$invalid) {
            this.$scope.formBuscar.$setDirty();
            return;
        }

        var parametros: ParametrosBusca = {
            DataDe: this.dataService.dataDe,
            DataAte: this.dataService.dataAte,
            Medico: this.medico,
            Paciente: this.paciente,
            SolucaoId: this.solucaoId,
            SolucionadorId: this.solucionadorId,
            MotivoId: this.motivoId,
            AtendenteId: this.atendenteId
        };

        this.ativaCarregando();
        this.dataService.pesquisado = true;
        this.dataService
            .getDams(parametros)
            .then(dams => {
                this.dataService.listaBuscar = dams;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }
}