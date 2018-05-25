import swal from 'sweetalert2';
import { IQService, IDeferred } from 'angular';
import { IModalService, IModalSettings } from 'angular-ui-bootstrap';

import { IAuthService } from '../auth';
import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppSettings } from '../core';
import { DamsDataService, DamDto, DamPosicoesDto } from '../dams';

export class DamsDetalharController extends BaseClassController {
    public caminhoImagem: string;
    public dam: DamDto;
    public damId: number;
    public exibeAtender: boolean;
    public exibeFinalizar: boolean;
    public exibeImagem: boolean;
    public exibePosicoes: boolean;
    public posicoes: DamPosicoesDto[];

    public static $inject: string[] = ['damsDataService', 'logger', 'AuthService', '$uibModal', 'appSettings', '$q'];
    constructor(
        private dataService: DamsDataService,
        logger: ILogger,
        private authService: IAuthService,
        private $uibModal: IModalService,
        appSettings: IAppSettings,
        private $q: IQService
    ) {
        super(logger);
        this.caminhoImagem = appSettings.caminhoImagem;
    }

    public $onInit = () => {
        this.getDam(this.damId);
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private getDam = (damId: number) => {
        this.ativaCarregando();
        this.dataService
            .getDam(damId)
            .then(dam => {
                this.dam = dam;
                if (dam.solucionadorId !== null && dam.posicaoFinal === null) {
                    this.exibeAtender = true;
                } else {
                    this.exibeAtender = false;
                }

                if (dam.finalizado) {
                    this.exibePosicoes = false;
                    this.exibeImagem = false;
                } else {
                    this.exibePosicoes = true;
                    this.exibeImagem = true;
                }

                if (!dam.finalizado && dam.posicaoFinal !== null) {
                    this.exibeFinalizar = true;
                    this.exibeImagem = false;
                } else {
                    this.exibeFinalizar = false;
                }
                this.getPosicoesDam(this.damId);
                this.dam.imagens.forEach(imagem => {
                    this.isImage(this.caminhoImagem + '/' + imagem.caminho).then((isImagem: boolean) => {
                        if (isImagem) {
                            imagem.isImagem = true;
                        } else {
                            imagem.isImagem = false;
                        }
                    });
                });
            })
            .catch(this.callbackFail);
    }

    private getPosicoesDam = (damId: number) => {
        this.dataService
            .getPosicoesDam(damId)
            .then(posicoes => {
                this.posicoes = posicoes;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public abrirModalImagens = (dam: DamDto) => {
        var modalSettings: IModalSettings = {
            component: 'damsImagensComponent',
            size: 'lg',
            resolve: {
                dam: () => {
                    return dam;
                }
            }
        };

        this.$uibModal.open(modalSettings).result.then(() => {
            this.getDam(this.damId);
        }, () => { this.getDam(this.damId); });
    }

    public abrirModalHistorico = (dam: DamDto) => {
        var modalSettings: IModalSettings = {
            component: 'damsHistoricoComponent',
            size: 'lg',
            resolve: {
                dam: () => {
                    return dam;
                }
            }
        };

        this.$uibModal.open(modalSettings).result.then(() => {
            return true;
        }, () => { return true; });
    }

    public abrirModalAtender = (dam: DamDto) => {
        var modalSettings: IModalSettings = {
            component: 'damsAtenderComponent',
            size: 'lg',
            resolve: {
                dam: () => {
                    return dam;
                }
            }
        };

        this.$uibModal.open(modalSettings).result.then(() => {
            this.getDam(this.damId);
        }, () => { return true; });
    }

    public abrirModalFinalizar = (dam: DamDto) => {
        var modalSettings: IModalSettings = {
            component: 'damsFinalizarComponent',
            size: 'lg',
            resolve: {
                dam: () => {
                    return dam;
                }
            }
        };

        this.$uibModal.open(modalSettings).result.then(() => {
            this.getDam(this.damId);
        }, () => { return true; });
    }

    public exibeFinalizarDam = () => {
        swal({
            title: 'Tem certeza que deseja finalizar o DAM?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Finalizar!',
            confirmButtonColor: '#00A65A',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return this.dataService.finalizarDam(this.dam.id);
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
            if (result.value) {
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Dam finalizado com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
                this.getDam(this.damId);
            }
        });
    }

    public exibeIniciarAtendimento = () => {
        swal({
            title: 'Tem certeza que deseja iniciar o atendimento?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Iniciar',
            confirmButtonColor: '#00A65A',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                this.dam.solucionadorId = this.authService.autenticacao.userId;
                return this.dataService.iniciarAtendimento(this.dam.id, this.dam);
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
            if (result.value) {
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Atendimento iniciado com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
                this.getDam(this.damId);
            }
        });
    }

    public voltar = () => {
        window.history.back();
    }

    public exibeMarcarPosicoes = () => {
        swal({
            title: 'Tem certeza que deseja marcar todas as posições como lidas?',
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#00A65A',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return this.dataService.marcarPosicoesComoLidas(this.dam.id);
            },
            allowOutsideClick: () => !swal.isLoading()
        }).then((result) => {
            if (result.value) {
                swal({
                    showConfirmButton: false,
                    title: 'Sucesso!',
                    text: 'Posições marcadas com sucesso.',
                    timer: 2000,
                    type: 'success'
                });
                this.getDam(this.damId);
            }
        });
    }

    private isImage = (src: string) => {
        var deferred: IDeferred<{}> = this.$q.defer();

        var image: HTMLImageElement = new Image();
        image.onerror = () => {
            deferred.resolve(false);
        };
        image.onload = () => {
            deferred.resolve(true);
        };
        image.src = src;
        return deferred.promise;
    }
}