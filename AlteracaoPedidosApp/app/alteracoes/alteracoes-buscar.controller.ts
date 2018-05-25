import * as angular from 'angular';
import * as moment from 'moment';
import { BaseClassController } from '../core/base.class';

import { IAppScope, IAppSettings, IFilial, ISetorRequisitante } from '../core';
import { ILogger } from '../logger';
import { AlteracoesDataService, ParametrosBusca } from '../alteracoes';
import { UsuarioDto, UsuariosDataService } from '../usuarios';

export class AlteracoesBuscarController extends BaseClassController {
    public dataDePickOpen: boolean;
    public dataAtePickOpen: boolean;
    public filiais: IFilial[];
    public filialDe: string;
    public filialPara: string;
    public numPedido: string;
    public solicitanteId: number;
    public setorRequisitante: number;

    public listaUsuarios: UsuarioDto[];
    public setores: ISetorRequisitante[];

    public static $inject: string[] = ['alteracoesDataService', 'logger', 'uibDateParser', '$scope', 'usuariosDataService', 'appSettings'];
    constructor(
        private dataService: AlteracoesDataService,
        logger: ILogger,
        uibDateParser: any,
        private $scope: IAppScope,
        private usuariosDataService: UsuariosDataService,
        private appSettings: IAppSettings
    ) {
        super(logger);
        this.solicitanteId = 1;
        this.setores = angular.copy(this.appSettings.setoresRequisitantes);
        this.setores.push({
            id: 0,
            setor: 'Todos'
        });
        this.setorRequisitante = 0;
        this.filiais = this.appSettings.filiais;
        this.filiais.push({
            filial: 'Todas'
        });
        this.filialDe = 'Todas';
        this.filialPara = 'Todas';

        if (this.dataService.dataDe === undefined || this.dataService.dataAte === undefined) {
            this.dataService.dataDe = uibDateParser.parse(moment().startOf('month').toDate(), 'yyyy-MM-dd');
            this.dataService.dataAte = uibDateParser.parse(moment().endOf('month').toDate(), 'yyyy-MM-dd');
        }
    }

    public $onInit = () => {
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
        this.getUsuarios();
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

    public buscarAlteracoes = () => {
        if (this.$scope.formBuscar.$invalid) {
            this.$scope.formBuscar.$setDirty();
            return;
        }

        var parametros: ParametrosBusca = {
            DataDe: this.dataService.dataDe,
            DataAte: this.dataService.dataAte,
            NumPedido: this.numPedido,
            SolicitanteId: this.solicitanteId,
            SetorRequisitante: this.setorRequisitante,
            FilialDe: this.filialDe,
            FilialPara: this.filialPara
        };

        this.ativaCarregando();
        this.dataService.pesquisado = true;
        this.dataService
            .getAlteracoes(parametros)
            .then(alteracoes => {
                this.dataService.listaBuscar = alteracoes;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public imprimir = () => {
        window.print();
    }
}
