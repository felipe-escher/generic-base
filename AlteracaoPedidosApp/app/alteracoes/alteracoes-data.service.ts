import { IHttpService } from 'angular';
import { IAppSettings, ISetorRequisitante } from '../core';
import { AlteracaoDto, ParametrosBusca, DashboardModel } from '../alteracoes';

export class AlteracoesDataService {
    private serviceUrl: string;

    public dataDe: string;
    public dataAte: string;
    public pesquisado: boolean;
    public setores: ISetorRequisitante[];
    public listaBuscar: AlteracaoDto[];

    public static $inject: string[] = ['$http', 'appSettings'];
    constructor(
        private $http: IHttpService,
        private appSettings: IAppSettings
    ) {
        this.serviceUrl = this.appSettings.apiServiceBaseUri + '/api/alteracoes/';
        this.setores = this.appSettings.setoresRequisitantes;

        this.pesquisado = false;
        this.listaBuscar = [];
    }

    private sortAlteracoes = (a: AlteracaoDto, b: AlteracaoDto) => {
        if (a.id > b.id) {
            return 1;
        } else {
            return -1;
        }
    }

    public setorRequisitanteNome = (setorRequisitanteId: number): string => {
        var setor: ISetorRequisitante[] = $.grep(this.setores, (setor) => {
            return setor.id === setorRequisitanteId;
        });
        if (setor.length === 0) {
            return 'Setor não cadastrado!';
        } else if (setor.length === 1) {
            return setor[0].setor;
        } else {
            return 'Setor duplicado!';
        }
    }

    private callbackFail = (erro: any) => {
        return erro;
    }

    public getAlteracao = (alteracaoId: number): ng.IPromise<AlteracaoDto> => {
        return this.$http
            .get<AlteracaoDto>(this.serviceUrl + alteracaoId)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getAlteracoes = (parametros: ParametrosBusca) => {
        return this.$http
        .post<AlteracaoDto[]>(this.serviceUrl + 'buscar', parametros)
        .then(response => {
            return response.data;
        })
        .catch(this.callbackFail);
    }

    public buscarDashboard = (parametros: ParametrosBusca): ng.IPromise<DashboardModel> => {
        return this.$http
        .post<DashboardModel>(this.serviceUrl + 'buscarDashboard', parametros)
        .then(response => {
            return response.data;
        })
        .catch(this.callbackFail);
    }

    public getAlteracoesAguardando = (): ng.IPromise<AlteracaoDto[]> => {
        return this.$http
            .get<AlteracaoDto[]>(this.serviceUrl + 'aguardando')
            .then(response => {
                return response.data.sort(this.sortAlteracoes);
            })
            .catch(this.callbackFail);
    }

    public getAlteracoesAguardandoFinalizacao = (): ng.IPromise<AlteracaoDto[]> => {
        return this.$http
            .get<AlteracaoDto[]>(this.serviceUrl + 'aguardandoFinalizacao')
            .then(response => {
                return response.data.sort(this.sortAlteracoes);
            })
            .catch(this.callbackFail);
    }

    public createAlteracao = (alteracao: AlteracaoDto): any => {
        return this.$http
            .post<AlteracaoDto>(this.serviceUrl, alteracao);
    }

    public updateAlteracao = (id: number, alteracao: AlteracaoDto) => {
        return this.$http
            .patch<AlteracaoDto>(this.serviceUrl + id, alteracao);
    }

    public receberAlteracao = (alteracaoId: number, recebedorId: number) => {
        return this.$http
            .patch<AlteracaoDto>(this.serviceUrl + alteracaoId + '/recebedor/' + recebedorId, null);
    }

    public updateObservacoes = (alteracaoId: number, observacoes: string) => {
        var parametros: any = {
            Observacoes: observacoes
        };

        return this.$http
            .patch(this.serviceUrl + alteracaoId + '/observacoes/', parametros);
    }

    public deleteAlteracao = (id: number): ng.IPromise<boolean> => {
        return this.$http
            .delete(this.serviceUrl + id)
            .then(() => {
                return true;
            })
            .catch(this.callbackFail);
    }
}
