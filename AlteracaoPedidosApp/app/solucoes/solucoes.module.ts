import { module } from 'angular';

import states from './solucoes.states';
import { SolucoesDataService } from './solucoes-data.service';

import { SolucoesListController } from './solucoes-list.controller';
import { SolucoesCreateController } from './solucoes-create.controller';
import { SolucoesUpdateController } from './solucoes-update.controller';

import { SolucoesListComponent } from './solucoes-list.component';
import { SolucoesCreateComponent } from './solucoes-create.component';
import { SolucoesUpdateComponent } from './solucoes-update.component';


export const solucoesModule: ng.IModule = module('app.solucoes', [])
    .config(states)
    .service('solucoesDataService', SolucoesDataService)
    .controller('solucoesListController', SolucoesListController)
    .controller('solucoesCreateController', SolucoesCreateController)
    .controller('solucoesUpdateController', SolucoesUpdateController)
    .component('solucoesListComponent', new SolucoesListComponent())
    .component('solucoesCreateComponent', new SolucoesCreateComponent())
    .component('solucoesUpdateComponent', new SolucoesUpdateComponent());
