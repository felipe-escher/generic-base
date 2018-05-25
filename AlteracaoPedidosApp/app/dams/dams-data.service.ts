import { IHttpService } from 'angular';
import { IAppSettings } from '../core';
import { DamDto, DamPosicoesDto, FcertaClienteDto, FcertaMedicoDto, DamAtendimentoDto,
    DamAtivosSubstituidosDto, ParametrosBusca } from '../dams';

export class DamsDataService {
    private serviceUrl: string;
    public dataDe: string;
    public dataAte: string;
    public listaBuscar: DamDto[];
    public pesquisado: boolean;

    public static $inject: string[] = ['$http', 'appSettings'];
    constructor(
        private $http: IHttpService,
        appSettings: IAppSettings
    ) {
        this.pesquisado = false;
        this.listaBuscar = [];
        this.serviceUrl = appSettings.apiServiceBaseUri  + '/api/dams/';
    }

    private sortDams = (a: DamDto, b: DamDto) => {
        if (a.id > b.id) {
            return 1;
        } else {
            return -1;
        }
    }

    private callbackFail = (erro: any) => {
        return erro;
    }

    public getDam = (damId: number): ng.IPromise<DamDto> => {
        return this.$http
            .get<DamDto>(this.serviceUrl + damId)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getDams = (parametros: ParametrosBusca) => {
        return this.$http
                .post<DamDto[]>(this.serviceUrl + 'buscar', parametros)
                .then(response => {
                    return response.data;
                })
                .catch(this.callbackFail);
    }

    public getDamsAguardando = (): ng.IPromise<DamDto[]> => {
        return this.$http
            .get<DamDto[]>(this.serviceUrl + 'aguardando')
            .then(response => {
                return response.data.sort(this.sortDams);
            })
            .catch(this.callbackFail);
    }

    public getAguardandoFinalizacaoPorAtendente = (atendenteId: number): ng.IPromise<DamDto[]> => {
        return this.$http
            .get<DamDto[]>(this.serviceUrl + 'atendente/' + atendenteId)
            .then(response => {
                return response.data.sort(this.sortDams);
            })
            .catch(this.callbackFail);
    }

    public getPosicoesDam = (damId: number): ng.IPromise<DamPosicoesDto[]> => {
        return this.$http
            .get<DamPosicoesDto[]>(this.serviceUrl + 'posicoes/' + damId)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getCliente = (codCliente: number): ng.IPromise<FcertaClienteDto> => {
        return this.$http
            .get<FcertaClienteDto>(this.serviceUrl + 'cliente/' + codCliente)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getMedicos = (nome: string): ng.IPromise<FcertaMedicoDto[]> => {
        return this.$http
            .get<FcertaMedicoDto[]>(this.serviceUrl + 'medicos/' + nome)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getNovasPosicoesPorAtendente = (atendenteId: number): ng.IPromise<DamDto[]> => {
        return this.$http
            .get<DamDto[]>(this.serviceUrl + 'novasPosicoes/' + atendenteId)
            .then(response => {
                return response.data.sort(this.sortDams);
            })
            .catch(this.callbackFail);
    }

    public marcarPosicoesComoLidas = (damId: number) => {
        return this.$http
            .patch<DamDto>(this.serviceUrl + 'marcarLido/' + damId, null);
    }

    public createDam = (dam: DamDto) => {
        return this.$http
            .post<DamDto>(this.serviceUrl, dam)
            .then(response => {
                return response.data;
            });
    }

    public updateDam = (id: number, dam: DamDto) => {
        return this.$http
            .patch<DamDto>(this.serviceUrl + id, dam);
    }

    public deleteDam = (id: number) => {
        return this.$http
            .delete(this.serviceUrl + id)
            .then(() => {
                return true;
            })
            .catch(this.callbackFail);
    }

    public deleteImagem = (damId: number, imagemId: number) => {
        return this.$http
        .get<DamDto[]>(this.serviceUrl + 'deleteImagem/' + damId + '/' + imagemId)
        .then(response => {
            return response.data;
        })
        .catch(this.callbackFail);
    }

    public createAtendimento = (damId: number, posicao: string, usuarioId: number) => {
        var atendimento: DamAtendimentoDto = {
            damId: damId,
            posicao: posicao,
            usuarioId: usuarioId
        };

        return this.$http
            .post<DamAtendimentoDto>(this.serviceUrl + 'atendimento', atendimento)
            .then(response => {
                return response.data;
            });
    }

    public deleteAtendimento = (atendimentoId: number) => {
        return this.$http
            .delete(this.serviceUrl + 'atendimento/' + atendimentoId)
            .then(() => {
                return true;
            }).catch(this.callbackFail);
    }

    public createAtivoSubstituido = (damId: number, emFalta: string, substituto: string) => {
        var ativo: DamAtivosSubstituidosDto = {
            damId: damId,
            ativoEmFalta: emFalta,
            ativoSubstituto: substituto
        };

        return this.$http
            .post<DamAtivosSubstituidosDto>(this.serviceUrl + 'ativo', ativo)
            .then(response => {
                return response.data;
            });
    }

    public deleteAtivoSubstituido = (ativoId: number) => {
        return this.$http
            .delete(this.serviceUrl + 'ativo/' + ativoId)
            .then(() => {
                return true;
            })
            .catch(this.callbackFail);
    }

    public iniciarAtendimento = (id: number, dam: DamDto) => {
        return this.$http
            .patch<DamDto>(this.serviceUrl + 'iniciarAtendimento/' + id, dam);
    }

    public finalizarAtendimento = (id: number, dam: DamDto) => {
        return this.$http
            .patch<DamDto>(this.serviceUrl + 'finalizarAtendimento/' + id, dam)
            .then(response => {
                return response.data;
            });
    }

    public finalizarDam = (id: number) => {
        return this.$http
            .patch<DamDto>(this.serviceUrl + 'finalizarDam/' + id, null)
            .then(response => {
                return response.data;
            });
    }
}
