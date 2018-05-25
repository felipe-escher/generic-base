function configureRoutes($stateProvider: ng.ui.IStateProvider, $httpProvider: ng.IHttpProvider,
             $urlRouterProvider: ng.ui.IUrlRouterProvider): void {
    $urlRouterProvider.otherwise('/dashboard');
    $httpProvider.interceptors.push('AuthInterceptorService');

    $stateProvider
        .state('app', {
            template: require('app.html!text')
        });
}
configureRoutes.$inject = ['$stateProvider', '$httpProvider', '$urlRouterProvider'];

export default configureRoutes;