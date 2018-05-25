import { module } from 'angular';

import states from './motivos.states';
import { MotivosDataService } from './motivos-data.service';

import { MotivosListController } from './motivos-list.controller';
import { MotivosCreateController } from './motivos-create.controller';
import { MotivosUpdateController } from './motivos-update.controller';

import { MotivosListComponent } from './motivos-list.component';
import { MotivosCreateComponent } from './motivos-create.component';
import { MotivosUpdateComponent } from './motivos-update.component';


export const motivosModule: ng.IModule = module('app.motivos', [])
    .config(states)
    .service('motivosDataService', MotivosDataService)
    .controller('motivosListController', MotivosListController)
    .controller('motivosCreateController', MotivosCreateController)
    .controller('motivosUpdateController', MotivosUpdateController)
    .component('motivosListComponent', new MotivosListComponent())
    .component('motivosCreateComponent', new MotivosCreateComponent())
    .component('motivosUpdateComponent', new MotivosUpdateComponent());
