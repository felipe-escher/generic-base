import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

const autenticacaoState: Ng1StateDeclaration = {
    url: '/login',
    component: 'loginComponent'
}

configureStates.$inject = ['$stateProvider'];
function configureStates($stateProvider: StateProvider): void {
    $stateProvider.state('login', autenticacaoState);
}

export default configureStates;