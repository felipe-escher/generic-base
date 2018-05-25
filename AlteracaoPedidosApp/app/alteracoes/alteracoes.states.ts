import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

configureStates.$inject = ['$stateProvider'];
export default function configureStates($stateProvider: StateProvider): void {
    var states: Ng1StateDeclaration[] = [
            {
                name: 'app.alteracoesCreate',
                url: '/alteracoes/create',
                component: 'alteracoesCreateComponent'
            },
            {
                name: 'app.alteracoesDetalhar',
                url: '/alteracoes/detalhar/{alteracaoId}',
                component: 'alteracoesDetalharComponent',
                resolve: {
                    alteracaoId: ($transition$: any) => { return $transition$.params().alteracaoId; }
                }
            },
            {
                name: 'app.alteracoesBuscar',
                url: '/alteracoes/buscar',
                component: 'alteracoesBuscarComponent'
            }
        ];

        states.forEach((state) => {
            $stateProvider.state(state);
        });
}
