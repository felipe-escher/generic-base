export as namespace auth;

export interface IAuthService {
    autenticacao: IAuthenticationData;
    login(loginData: ILoginData): ng.IPromise<IToken>;
    logOut(): void;
    fillAuthData(): void;
    refreshToken: () => ng.IPromise<{}>;
}

export interface IAuthenticationData {
    isAuth: boolean;
    userId: number;
    userLogin: string;
    userName: string;
    usarRefreshTokens: boolean;
    permissoes: string[];
    dashPadrao: string;
}

export interface IAuthorizationData {
    token: any;
    userId: string;
    userLogin: string;
    userName: string;
    refreshToken: any;
    usarRefreshTokens: boolean;
    permissoes: any;
    dashPadrao: string;
}

export interface IToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    client_id: string;
    userId: string;
    userLogin: string;
    userName: string;
    guid: string;
}

export interface ILoginData {
    userName: string;
    password: string;
}

export interface IAppSettings {
    apiServiceBaseUri: string;
    apiLoginUri: string;
    clientId: string;
}

export interface ILoginController {
    loginData: any;
    mensagem: string;
    login(): void;
}

export interface IloginScope extends ng.IScope {
    formLogin: any;
}
