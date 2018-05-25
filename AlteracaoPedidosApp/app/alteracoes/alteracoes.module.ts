import { module } from 'angular';

import states from './alteracoes.states';
import { AlteracoesDataService } from './alteracoes-data.service';

import { AlteracoesCreateComponent } from './alteracoes-create.component';
import { AlteracoesCreateController } from './alteracoes-create.controller';

import { AlteracoesDetalharComponent } from './alteracoes-detalhar.component';
import { AlteracoesDetalharController } from './alteracoes-detalhar.controller';

import { AlteracoesBuscarComponent } from './alteracoes-buscar.component';
import { AlteracoesBuscarController } from './alteracoes-buscar.controller';

import { AlteracoesObservacoesComponent } from './alteracoes-observacoes.component';
import { AlteracoesObservacoesController } from './alteracoes-observacoes.controller';

export const alteracoesModule: ng.IModule = module('app.alteracoes', [])
    .config(states)
    .service('alteracoesDataService', AlteracoesDataService)
    .controller('alteracoesCreateController', AlteracoesCreateController)
    .controller('alteracoesDetalharController', AlteracoesDetalharController)
    .controller('alteracoesBuscarController', AlteracoesBuscarController)
    .controller('alteracoesObservacoesController', AlteracoesObservacoesController)
    .component('alteracoesCreateComponent', new AlteracoesCreateComponent())
    .component('alteracoesDetalharComponent', new AlteracoesDetalharComponent())
    .component('alteracoesBuscarComponent', new AlteracoesBuscarComponent())
    .component('alteracoesObservacoesComponent', new AlteracoesObservacoesComponent());
