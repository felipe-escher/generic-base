import { module } from 'angular';

import states from './dams.states';
import { DamsDataService } from './dams-data.service';

import { DamsCreateComponent } from './dams-create.component';
import { DamsDetalharComponent } from './dams-detalhar.component';
import { DamsImagensComponent } from './dams-imagens.component';
import { DamsHistoricoComponent } from './dams-historico.component';
import { DamsAtivosComponent } from './dams-ativos.component';
import { DamsUpdateComponent } from './dams-update.component';
import { DamsAtenderComponent } from './dams-atender.component';
import { DamsFinalizarComponent } from './dams-finalizar.component';
import { DamsBuscarComponent } from './dams-buscar.component';
import { DamsBuscarMedicoComponent } from './dams-buscarMedico.component';

import { DamsCreateController } from './dams-create.controller';
import { DamsDetalharController } from './dams-detalhar.controller';
import { DamsImagensController } from './dams-imagens.controller';
import { DamsHistoricoController } from './dams-historico.controller';
import { DamsAtivosController } from './dams-ativos.controller';
import { DamsUpdateController } from './dams-update.controller';
import { DamsAtenderController } from './dams-atender.controller';
import { DamsFinalizarController } from './dams-finalizar.controller';
import { DamsBuscarController } from './dams-buscar.controller';
import { DamsBuscarMedicoController } from './dams-buscarMedico.controller';

export const damsModule: ng.IModule = module('app.dams', [])
    .config(states)
    .service('damsDataService', DamsDataService)
    .controller('damsCreateController', DamsCreateController)
    .controller('damsDetalharController', DamsDetalharController)
    .controller('damsImagensController', DamsImagensController)
    .controller('damsHistoricoController', DamsHistoricoController)
    .controller('damsAtivosController', DamsAtivosController)
    .controller('damsUpdateController', DamsUpdateController)
    .controller('damsAtenderController', DamsAtenderController)
    .controller('damsFinalizarController', DamsFinalizarController)
    .controller('damsBuscarController', DamsBuscarController)
    .controller('damsBuscarMedicoController', DamsBuscarMedicoController)
    .component('damsCreateComponent', new DamsCreateComponent())
    .component('damsDetalharComponent', new DamsDetalharComponent())
    .component('damsImagensComponent', new DamsImagensComponent())
    .component('damsHistoricoComponent', new DamsHistoricoComponent())
    .component('damsAtivosComponent', new DamsAtivosComponent())
    .component('damsUpdateComponent', new DamsUpdateComponent())
    .component('damsAtenderComponent', new DamsAtenderComponent())
    .component('damsFinalizarComponent', new DamsFinalizarComponent())
    .component('damsBuscarComponent', new DamsBuscarComponent())
    .component('damsBuscarMedicoComponent', new DamsBuscarMedicoComponent());
