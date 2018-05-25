import { StateProvider, Ng1StateDeclaration } from '@uirouter/angularjs';

configureStates.$inject = ['$stateProvider'];
function configureStates($stateProvider: StateProvider): void {
    var states: Ng1StateDeclaration[] = [
        {
            name: 'app.dashboard',
            url: '/dashboard',
            component: 'dashboardComponent'
        }
    ];

    states.forEach((state) => {
        $stateProvider.state(state);
    });
}

export default configureStates;