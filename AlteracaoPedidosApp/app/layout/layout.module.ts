import { module } from 'angular';

import { core } from '../core/core.module';

import { HeaderDataService } from './header/header-data.service';

import { HeaderComponent } from './header/header.component';
import { HeaderController } from './header/header.controller';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarController } from './sidebar/sidebar.controller';

export const layout: angular.IModule = module('app.layout', [core.name])
    .controller('HeaderController', HeaderController)
    .controller('sidebarController', SidebarController)
    .service('headerDataService', HeaderDataService)
    .component('layoutHeader', new HeaderComponent())
    .component('layoutSidebar', new SidebarComponent());
