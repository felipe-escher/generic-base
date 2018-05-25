import { module } from 'angular';

import states from './usuarios.states';
import { UsuariosDataService  } from './usuarios-data.service';

import { UsuariosListController  } from './usuarios-list.controller';
import { UsuariosPermissoesController  } from './usuarios-permissoes.controller';

import { UsuariosListComponent  } from './usuarios-list.component';
import { UsuariosPermissoesComponent  } from './usuarios-permissoes.component';

export const usuariosModule: ng.IModule = module('app.usuarios', [])
    .config(states)
    .service('usuariosDataService', UsuariosDataService)
    .controller('usuariosListController', UsuariosListController)
    .controller('usuariosPermissoesController', UsuariosPermissoesController)
    .component('usuariosListComponent', new UsuariosListComponent())
    .component('usuariosPermissoesComponent', new UsuariosPermissoesComponent());
