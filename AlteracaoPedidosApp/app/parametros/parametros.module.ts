import { module } from 'angular';

import states from './parametros.states';
import { ParametrosDataService } from './parametros-data.service';

import { ParametrosListController } from './parametros-list.controller';
import { ParametrosCreateController } from './parametros-create.controller';
import { ParametrosUpdateController } from './parametros-update.controller';

import { ParametrosListComponent } from './parametros-list.component';
import { ParametrosCreateComponent } from './parametros-create.component';
import { ParametrosUpdateComponent } from './parametros-update.component';

export const parametrosModule: ng.IModule = module('app.parametros', [])
    .config(states)
    .service('parametrosDataService', ParametrosDataService)
    .controller('parametrosListController', ParametrosListController)
    .controller('parametrosCreateController', ParametrosCreateController)
    .controller('parametrosUpdateController', ParametrosUpdateController)
    .component('parametrosListComponent', new ParametrosListComponent())
    .component('parametrosCreateComponent', new ParametrosCreateComponent())
    .component('parametrosUpdateComponent', new ParametrosUpdateComponent());