import { IHttpService } from 'angular';
import { IAppSettings } from '../core';
import { ParametroDto } from '../parametros';

export class ParametrosDataService {
    private serviceUrl: string;
    public static $inject: string[] = ['$http', 'appSettings'];
    constructor(
        private $http: IHttpService,
        private appSettings: IAppSettings
    ) {
        this.serviceUrl = this.appSettings.apiServiceBaseUri + '/api/parametros/';
    }

    private sortParametros = (a: ParametroDto, b: ParametroDto) => {
        if (a.id > b.id) {
            return 1;
        } else {
            return -1;
        }
    }

    private callbackFail = (erro: any) => {
        return erro;
    }

    public getParametro = (parametroId: number) => {
        return this.$http
            .get<ParametroDto>(this.serviceUrl + parametroId)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getParametros = () => {
        return this.$http
            .get<ParametroDto[]>(this.serviceUrl)
            .then(response => {
                return response.data.sort(this.sortParametros);
            })
            .catch(this.callbackFail);
    }

    public createParametro = (parametro: ParametroDto) => {
        return this.$http
            .post<ParametroDto>(this.serviceUrl, parametro)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public updateParametro = (id: number, parametro: ParametroDto) => {
        return this.$http
            .patch<ParametroDto>(this.serviceUrl + id, parametro);
    }

    public deleteParametro = (id: number) => {
        return this.$http
            .delete(this.serviceUrl + id)
            .then(() => {
                return true;
            })
            .catch(this.callbackFail);
    }
}
