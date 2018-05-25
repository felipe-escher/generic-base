import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

configureStates.$inject = ['$stateProvider'];
export default function configureStates($stateProvider: StateProvider): void {
    var states: Ng1StateDeclaration[] = [
            {
                name: 'app.solucoesListar',
                url: '/solucoes/listar',
                component: 'solucoesListComponent'
            },
            {
                name: 'app.solucoesUpdate',
                url: '/solucoes/update/{solucaoId}',
                component: 'solucoesUpdateComponent',
                resolve: {
                    solucaoId: ($transition$: any) => { return $transition$.params().solucaoId; }
                }
            },
            {
                name: 'app.solucoesCreate',
                url: '/solucoes/create',
                component: 'solucoesCreateComponent'
            }
        ];

        states.forEach((state) => {
            $stateProvider.state(state);
        });
}
