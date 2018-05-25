import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

configureStates.$inject = ['$stateProvider'];
export default function configureStates($stateProvider: StateProvider): void {
    var states: Ng1StateDeclaration[] = [
            {
                name: 'app.usuariosListar',
                url: '/usuarios/listar',
                component: 'usuariosListComponent'
            },
            {
                name: 'app.usuariosUpdate',
                url: '/usuarios/update/{usuarioId}',
                component: 'usuariosPermissoesComponent',
                resolve: {
                    usuarioId: ($transition$: any) => { return $transition$.params().usuarioId; }
                }
            }
        ];

        states.forEach((state) => {
            $stateProvider.state(state);
        });
}
