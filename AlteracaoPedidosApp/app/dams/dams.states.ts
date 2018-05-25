import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

configureStates.$inject = ['$stateProvider'];
export default function configureStates($stateProvider: StateProvider): void {
    var states: Ng1StateDeclaration[] = [
            {
                name: 'app.damsBuscar',
                url: '/dams/buscar',
                component: 'damsBuscarComponent'
            },
            {
                name: 'app.damsCreate',
                url: '/dams/create',
                component: 'damsCreateComponent'
            },
            {
                name: 'app.damsDetalhar',
                url: '/dams/detalhar/{damId}',
                component: 'damsDetalharComponent',
                resolve: {
                    damId: ($transition$: any) => { return $transition$.params().damId; }
                }
            },
            {
                name: 'app.damsUpdate',
                url: '/dams/update/{damId}',
                component: 'damsUpdateComponent',
                resolve: {
                    damId: ($transition$: any) => { return $transition$.params().damId; }
                }
            },
        ];

        states.forEach((state) => {
            $stateProvider.state(state);
        });
}
