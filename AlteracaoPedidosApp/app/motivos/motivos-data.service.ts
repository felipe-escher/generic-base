import { IHttpService } from 'angular';
import { IAppSettings } from '../core';
import { MotivoDto } from '../motivos';

export class MotivosDataService {
    public static $inject: string[] = ['$http', 'appSettings'];
    constructor(
        private $http: IHttpService,
        appSettings: IAppSettings,
        private serviceUrl: string = appSettings.apiServiceBaseUri + '/api/motivos/'
    ) {}

    private sortMotivos = (a: MotivoDto, b: MotivoDto) => {
        if (a.descricao > b.descricao) {
            return 1;
        } else {
            return -1;
        }
    }

    private callbackFail = (erro: any) => {
        return erro;
    }

    public getMotivo = (motivoId: number): ng.IPromise<MotivoDto> => {
        return this.$http
            .get<MotivoDto>(this.serviceUrl + motivoId)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getMotivos = () => {
        return this.$http
            .get<MotivoDto[]>(this.serviceUrl)
            .then(response => {
                return response.data.sort(this.sortMotivos);
            })
            .catch(this.callbackFail);
    }

    public getMotivosComInativos = () => {
        return this.$http
            .get<MotivoDto[]>(this.serviceUrl + 'inativos')
            .then(response => {
                return response.data.sort(this.sortMotivos);
            })
            .catch(this.callbackFail);
    }

    public createMotivo = (motivo: MotivoDto) => {
        return this.$http
            .post<MotivoDto>(this.serviceUrl, motivo)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public updateMotivo = (id: number, motivo: MotivoDto) => {
        return this.$http
            .patch<MotivoDto>(this.serviceUrl + id, motivo);
    }

    public deleteMotivo = (id: number) => {
        return this.$http
            .delete(this.serviceUrl + id)
            .then(() => {
                return true;
            })
            .catch(this.callbackFail);
    }
}
