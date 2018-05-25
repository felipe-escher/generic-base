import { module } from 'angular';
import uiRouter from '@uirouter/angularjs';
import 'angular-messages';
//import {visualizer} from 'ui-router-visualizer';
import 'angular-ui-bootstrap';
import 'angular-slimscroll';
import * as moment from 'moment';
//import 'moment-locale';
import * as swal from 'sweetalert';
import * as toastr from 'toastr';
import 'angular-local-storage';
import 'angular-authz';
import 'angular-bootstrap-datetimepicker';
import 'angular-ui-select';
import 'angular-sanitize';
import 'angular-signalr-hub';
import 'angular-web-notification';

import config from './core.states';
import { showErrorsConfig, runBlock } from './core.config';

export const core: angular.IModule = module('app.core',
    [
        'ngMessages',
        'ui.bootstrap',
        uiRouter,
        'LocalStorageModule',
        'angular-authz',
        'evitarLink',
        'ui.bootstrap.showErrors',
        'ui.slimscroll',
        'ui.bootstrap.datetimepicker',
        'ui.select',
        'ngSanitize',
        'SignalR',
        'angular-web-notification',
    ])
    .config(config)
    .config(showErrorsConfig)
    .constant('toastr', toastr)
    .constant('moment', moment)
    .constant('swal', swal)
    .run(runBlock);
    //.run(runTransition); Desativado no RC1, não esta fazendo as transições direito.

    //core.run($uiRouter => visualizer($uiRouter));