import { IHttpService } from 'angular';
import { IAppSettings } from '../core';
import { SolucaoDto } from '../solucoes';

export class SolucoesDataService {
    public static $inject: string[] = ['$http', 'appSettings'];
    constructor(
        private $http: IHttpService,
        appSettings: IAppSettings,
        private serviceUrl: string = appSettings.apiServiceBaseUri + '/api/solucoes/'
    ) {}

    private sortSolucoes = (a: SolucaoDto, b: SolucaoDto) => {
        if (a.descricao > b.descricao) {
            return 1;
        } else {
            return -1;
        }
    }

    private callbackFail = (erro: any) => {
        return erro;
    }

    public getSolucao = (solucaoId: number): ng.IPromise<SolucaoDto> => {
        return this.$http
            .get<SolucaoDto>(this.serviceUrl + solucaoId)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getSolucoes = (): ng.IPromise<SolucaoDto[]> => {
        return this.$http
            .get<SolucaoDto[]>(this.serviceUrl)
            .then(response => {
                return response.data.sort(this.sortSolucoes);
            })
            .catch(this.callbackFail);
    }

    public getSolucoesComInativos = () => {
        return this.$http
            .get<SolucaoDto[]>(this.serviceUrl + 'inativos')
            .then(response => {
                return response.data.sort(this.sortSolucoes);
            })
            .catch(this.callbackFail);
    }

    public createSolucao = (solucao: SolucaoDto) => {
        return this.$http
            .post<SolucaoDto>(this.serviceUrl, solucao)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public updateSolucao = (id: number, solucao: SolucaoDto) => {
        return this.$http
            .patch<SolucaoDto>(this.serviceUrl + id, solucao);
    }

    public deleteSolucao = (id: number) => {
        return this.$http
            .delete(this.serviceUrl + id)
            .then(() => {
                return true;
            })
            .catch(this.callbackFail);
    }
}
