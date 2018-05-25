import { ILocationService } from 'angular';

import { ILoginController, IloginScope, IAuthService } from '../auth';

export class LoginController implements ILoginController {
    private $location: ILocationService;
    private $scope: IloginScope;
    private authService: IAuthService;
    private authz: any;

    public logando: boolean;
    public loginData: any;
    public mensagem: string;
    public vm: ILoginController;

    public static $inject: string[] = ['$scope', '$location', 'AuthService', 'authz'];
    constructor($scope: IloginScope, $location: ILocationService, authService: IAuthService, authz: any) {
        this.$location = $location;
        this.$scope = $scope;
        this.authService = authService;
        this.authz = authz;
        this.vm = this;
        this.logando = false;

        this.loginData = {
            userName: '',
            passwords: ''
        };
        this.mensagem = '';
    }

    public login: () => void = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formLogin.$invalid) { return; }
        this.logando = true;

        this.authService
            .login(this.loginData)
            .then(this.loginSuccess)
            .catch(this.loginFail);
    }

    private loginSuccess = () => {
        this.authz.setPermissions(this.authService.autenticacao.permissoes);
        this.$location.path('/dashboard');
    }

    private loginFail: (erro: any) => void = (erro: any) => {
        this.logando = false;
        if (erro.data !== undefined) {
            this.mensagem = erro.data.error_description;
        }
        this.logando = false;
    }
}