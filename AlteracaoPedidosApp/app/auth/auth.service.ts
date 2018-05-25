import 'angular-local-storage';
import * as angular from 'angular';
import * as toastr from 'toastr';
import { IHttpService, ILocationService, IQService } from 'angular';
import { UsuariosDataService, UsuarioDto } from '../usuarios';

import { IAppSettings, IAuthenticationData, IAuthorizationData, IAuthService, IToken, ILoginData } from '../auth';

export class AuthService implements IAuthService {
    private $http: IHttpService;
    private $location: ILocationService;
    private $q: IQService;
    private appSettings: IAppSettings;
    private localStorageService: angular.local.storage.ILocalStorageService;

    public autenticacao: IAuthenticationData;

    public static $inject: string[] = ['$http', '$q', 'localStorageService', '$location', 'appSettings', 'usuariosDataService'];
    constructor($http: IHttpService, $q: IQService, localStorageService: angular.local.storage.ILocalStorageService,
        $location: ILocationService, appSettings: IAppSettings, private dataService: UsuariosDataService) {
        this.$http = $http;
        this.$location = $location;
        this.$q = $q;
        this.appSettings = appSettings;
        this.localStorageService = localStorageService;

        this.autenticacao = {
            isAuth: false,
            userId: 0,
            userLogin: '',
            userName: '',
            usarRefreshTokens: true,
            permissoes: [],
            dashPadrao: 'Atendente'
        };
    }

    private setAuthorizationData = (token: IToken, usuarioId: number , permissoes: string) => {
        this.localStorageService.set('authorizationData',
            {
                token: token.access_token,
                userLogin: token.userName,
                userName: token.userName,
                userId: usuarioId,
                refreshToken: token.refresh_token,
                usarRefreshTokens: true,
                permissoes: angular.fromJson(permissoes)
            });
    }

    public login = (loginData: ILoginData) => {
        let data: string = 'grant_type=password&username=' +
            loginData.userName + '&password=' +
            loginData.password + '&client_id=' +
            this.appSettings.clientId;
        let deferred: ng.IDeferred<IToken> = this.$q.defer<IToken>();

        this.$http.post<IToken>(
            this.appSettings.apiLoginUri + '/token',
            data,
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then((response: ng.IHttpPromiseCallbackArg<IToken>) => {
                this.dataService.getUsuarioGuid(response.data.guid, response.data.access_token).then((usuario: UsuarioDto) => {
                    this.setAuthorizationData(response.data, usuario.id, usuario.permissoes);
                    this.fillAuthData();
                    deferred.resolve(response.data);
                });
            }, (erro: any) => {
                this.logOut();
                deferred.reject(erro);
            });
        return deferred.promise;
    }

    public logOut = () => {
        this.localStorageService.remove('authorizationData');
        this.autenticacao.isAuth = false;
        this.autenticacao.userId = 0;
        this.autenticacao.userLogin = '';
        this.autenticacao.userName = '';
        this.autenticacao.usarRefreshTokens = true;
        this.autenticacao.permissoes = [];
        this.autenticacao.dashPadrao = 'Atendente';
    }

    public fillAuthData = () => {
        let authData: IAuthorizationData = this.localStorageService.get<IAuthorizationData>('authorizationData');
        if (authData) {
            this.autenticacao.isAuth = true;
            this.autenticacao.userId = parseInt(authData.userId);
            this.autenticacao.userLogin = authData.userLogin;
            this.autenticacao.userName = authData.userName;
            this.autenticacao.usarRefreshTokens = true;
            this.autenticacao.permissoes = angular.fromJson(authData.permissoes);
            this.autenticacao.dashPadrao = authData.dashPadrao;
        } else {
            this.$location.path('/login');
        }
    }

    public refreshToken = () => {
        let deferred: ng.IDeferred<{}> = this.$q.defer();
        let authData: IAuthorizationData = this.localStorageService.get<IAuthorizationData>('authorizationData');

        if (authData && authData.usarRefreshTokens) {
            let data: string = 'grant_type=refresh_token&refresh_token=' + authData.refreshToken + '&client_id='
                + this.appSettings.clientId;

            this.localStorageService.remove('authorizationData');

            this.$http.post<IToken>(this.appSettings.apiLoginUri + '/token', data,
                {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .then((response: ng.IHttpPromiseCallbackArg<IToken>) => {
                    this.dataService.getUsuarioGuid(response.data.guid, response.data.access_token).then((usuario: UsuarioDto) => {
                        this.setAuthorizationData(response.data, usuario.id, usuario.permissoes);
                        this.fillAuthData();
                        deferred.resolve(response.data);
                    });
                }, () => {
                    this.logOut();
                    toastr.clear();
                    this.$location.path('/login');
                });
        } else {
            deferred.reject();
        }

        return deferred.promise;
    }
}
