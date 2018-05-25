import { IComponentOptions } from 'angular';

export class SolucoesUpdateComponent implements IComponentOptions {
    public template: string;
    public controller: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.bindings = { 'solucaoId': '<' };
        this.controller = 'solucoesUpdateController';
        this.template = require('app/solucoes/solucoes-update.html!text');
    }
}