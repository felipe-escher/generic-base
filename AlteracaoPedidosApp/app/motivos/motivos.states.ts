import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

configureStates.$inject = ['$stateProvider'];
export default function configureStates($stateProvider: StateProvider): void {
    var states: Ng1StateDeclaration[] = [
            {
                name: 'app.motivosListar',
                url: '/motivos/listar',
                component: 'motivosListComponent'
            },
            {
                name: 'app.motivosUpdate',
                url: '/motivos/update/{motivoId}',
                component: 'motivosUpdateComponent',
                resolve: {
                    motivoId: ($transition$: any) => { return $transition$.params().motivoId; }
                }
            },
            {
                name: 'app.motivosCreate',
                url: '/motivos/create',
                component: 'motivosCreateComponent'
            }
        ];

        states.forEach((state) => {
            $stateProvider.state(state);
        });
}
