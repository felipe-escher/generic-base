import { module } from 'angular';

import { DashboardAtendenteSignalRService } from './dashboad-atendente.service';

export const signalRModule: ng.IModule = module('app.signalR', [])
    .service('dashboardAtendenteSignalRService', DashboardAtendenteSignalRService);
