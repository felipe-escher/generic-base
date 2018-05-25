export as namespace core;

export interface IAppSettings {
    apiServiceBaseUri: string;
    versao: string;
    filiais: IFilial[];
    setoresRequisitantes: ISetorRequisitante[];
}

export { BaseClassController } from './base.class';

export interface baseEfModel {
    id?: number;
}

import { IScope, IFormController } from 'angular';
export interface IAppScope extends IScope {
    formBuscar: IFormController;
    formCreate: IFormController;
    formUpdate: IFormController;
}

export interface IFilial {
    filial: string;
}

export interface ISetorRequisitante {
    id: number;
    setor: string;
}