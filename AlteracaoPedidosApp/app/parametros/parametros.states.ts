import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

configureStates.$inject = ['$stateProvider'];
export default function configureStates($stateProvider: StateProvider): void {
    var states: Ng1StateDeclaration[] = [
            {
                name: 'app.parametrosListar',
                url: '/parametros/listar',
                component: 'parametrosListComponent'
            },
            {
                name: 'app.parametrosUpdate',
                url: '/parametros/update/{parametroId}',
                component: 'parametrosUpdateComponent',
                resolve: {
                    parametroId: ($transition$: any) => { return $transition$.params().parametroId; }
                }
            },
            {
                name: 'app.parametrosCreate',
                url: '/parametros/create',
                component: 'parametrosCreateComponent'
            }
        ];

        states.forEach((state) => {
            $stateProvider.state(state);
        });
}
