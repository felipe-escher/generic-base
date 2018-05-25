import { module } from 'angular';

import states from './dashboard.states';
import { DashboardDataService } from './dashboard-data.service';
import { DashboardComponent } from './dashboard.component';
import { DashboardController } from './dashboard.controller';

export const dashboardModule: ng.IModule = module('app.dashboard', [])
    .config(states)
    .controller('dashboardController', DashboardController)
    .component('dashboardComponent', new DashboardComponent())
    .service('dashboardDataService', DashboardDataService);
