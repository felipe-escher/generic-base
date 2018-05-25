import { IHttpService } from 'angular';
import { IAppSettings } from '../core';
import { UsuarioDto } from '../usuarios';

export class UsuariosDataService {
    public static $inject: string[] = ['$http', 'appSettings'];
    constructor(
        private $http: IHttpService, appSettings: IAppSettings,
        private serviceUrl: string = appSettings.apiServiceBaseUri + '/api/usuarios/'
    ) {}

    private callbackFail = (erro: any) => {
        return erro;
    }

    public getPermissoes = () => {
        return this.$http
            .get('menu.permissoes.json')
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getUsuario = (usuarioId: number) => {
        return this.$http
            .get<UsuarioDto>(this.serviceUrl + usuarioId)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getUsuarioGuid = (guid: string, token: string) => {
        return this.$http
            .get<UsuarioDto>(this.serviceUrl + 'guid/' + guid,
            {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public getUsuarios = (status: string = 'Ativos') => {
        var url: string = this.serviceUrl;

        if (status !== 'Ativos') {
            url = url + 'inativos';
        }

        return this.$http
            .get<UsuarioDto[]>(url)
            .then(response => {
                return response.data.sort(this.sortUsuarios);
            })
            .catch(this.callbackFail);
    }

    private sortUsuarios = (a: UsuarioDto, b: UsuarioDto) => {
        if (a.nome > b.nome) {
            return 1;
        } else {
            return -1;
        }
    }

    public updateUsuario = (id: number, usuario: UsuarioDto) => {
        return this.$http
            .patch<UsuarioDto>(this.serviceUrl + id, usuario)
            .then(response => {
                return response.data;
            })
            .catch(this.callbackFail);
    }

    public deleteUsuario = (id: number) => {
        return this.$http
            .delete(this.serviceUrl + id)
            .then(() => { return true; })
            .catch(this.callbackFail);
    }
}
