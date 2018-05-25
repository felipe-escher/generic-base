import { module } from 'angular';
import { Logger } from './logger';

export const logger: ng.IModule = module('logger', [])
    .service('logger', Logger);