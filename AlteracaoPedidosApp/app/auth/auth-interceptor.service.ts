import { IHttpInterceptor, IQService, ILocationService, IRequestConfig, IDeferred, IHttpService,
    IHttpPromiseCallbackArg, auto } from 'angular';
import 'angular-local-storage';
import LocalStorage = angular.local.storage;

import { IAuthorizationData, IAuthService } from '../auth';

export class AuthInterceptorService implements IHttpInterceptor {
    private $q: IQService;
    private $location: ILocationService;
    private localStorageService: LocalStorage.ILocalStorageService;
    private $injector: auto.IInjectorService;

    public static $inject: string[] = ['$q', '$location', 'localStorageService', '$injector'];
    constructor($q: IQService, $location: ILocationService, localStorageService: LocalStorage.ILocalStorageService,
        $injector: auto.IInjectorService) {
        this.$q = $q;
        this.$location = $location;
        this.localStorageService = localStorageService;
        this.$injector = $injector;
    }

    public request: (config: IRequestConfig) => IRequestConfig = (config: any) => {
        config.headers = config.headers || {};

        let authData: IAuthorizationData = this.localStorageService.get<IAuthorizationData>('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    public responseError = (rejection: any) => {
        let deferred: IDeferred<any> = this.$q.defer();
        if (rejection.status === 401) {
            let authService: IAuthService = this.$injector.get<IAuthService>('AuthService');
            authService
                .refreshToken()
                .then(() => {
                this.retryHttpRequest(rejection.config, deferred);
            }).catch(() => {
                authService.logOut();
                this.$location.path('/login');
            });
        } else {
            deferred.reject(rejection);
        }
        return deferred.promise;
    }

    public retryHttpRequest: (config: any, deferred: IDeferred<{}>) => void = (config: any, deferred: IDeferred<{}>) => {
        let $http: IHttpService = this.$injector.get<IHttpService>('$http');
        $http(config).then((response: IHttpPromiseCallbackArg<{}>) => {
            deferred.resolve(response);
        }, (erro: any) => {
            deferred.reject(erro);
        });
    }
}