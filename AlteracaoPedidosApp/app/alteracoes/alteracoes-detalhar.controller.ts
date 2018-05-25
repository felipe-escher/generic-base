import * as swal from 'sweetalert';
import { IModalService, IModalSettings } from 'angular-ui-bootstrap';

import { IAuthService } from '../auth';
import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppSettings, ISetorRequisitante } from '../core';
import { AlteracoesDataService, AlteracaoDto } from '../alteracoes';

export class AlteracoesDetalharController extends BaseClassController {
    public alteracao: AlteracaoDto;
    public alteracaoId: number;
    public setores: ISetorRequisitante[];

    public static $inject: string[] = ['alteracoesDataService', 'logger', 'AuthService', '$uibModal', 'appSettings'];
    constructor(
        private dataService: AlteracoesDataService,
        logger: ILogger,
        private authService: IAuthService,
        private $uibModal: IModalService,
        private appSettings: IAppSettings
    ) {
        super(logger);
        this.setores = this.appSettings.setoresRequisitantes;
    }

    public $onInit = () => {
        this.getAlteracao(this.alteracaoId);
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private getAlteracao = (alteracaoId: number) => {
        this.ativaCarregando();
        this.dataService
            .getAlteracao(alteracaoId)
            .then(alteracao => {
                this.alteracao = alteracao;
                this.alteracao.setorRequisitanteNome = this.dataService.setorRequisitanteNome(alteracao.setorRequisitante);
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public exibeReceberAlteracao = () => {
        swal({
            title: 'Tem certeza que receber a alteração?',
            type: 'warning',
            html: true,
            showCancelButton: true,
            confirmButtonColor: '#00A65A',
            confirmButtonText: 'Receber',
            closeOnConfirm: true,
            cancelButtonText: 'Cancelar'
        },
            () => {
                this.receberAlteracao();
            });
    }

    public receberAlteracao = () => {
        this.ativaCarregando();
        this.dataService
            .receberAlteracao(this.alteracaoId, this.authService.autenticacao.userId)
            .then(() => {
                this.getAlteracao(this.alteracaoId);
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public exibeFinalizarAlteracao = () => {
        swal({
            title: 'Tem certeza que finalizar a alteração?',
            type: 'warning',
            html: true,
            showCancelButton: true,
            confirmButtonColor: '#00A65A',
            confirmButtonText: 'Finalizar',
            closeOnConfirm: true,
            cancelButtonText: 'Cancelar'
        },
            () => {
                this.finalizarAlteracao();
            });
    }

    public finalizarAlteracao = () => {
        this.alteracao.atendida = true;
        this.ativaCarregando();
        this.dataService
            .updateAlteracao(this.alteracaoId, this.alteracao)
            .then(alteracaoUpdate => {
                this.alteracao.atendida = alteracaoUpdate.data.atendida;
                this.alteracao.dataUltimaAlteracao = alteracaoUpdate.data.dataUltimaAlteracao;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public exibeObservacoes = () => {
        var modalSettings: IModalSettings = {
            component: 'alteracoesObservacoesComponent',
            resolve: {
                alteracaoId: () => {
                    return this.alteracaoId;
                },
                observacoes: () => {
                    return this.alteracao.observacoes;
                }
            }
        };
        this.$uibModal.open(modalSettings).result.then(() => {
            this.getAlteracao(this.alteracaoId);
        }, () => { return true; });
    }
}
