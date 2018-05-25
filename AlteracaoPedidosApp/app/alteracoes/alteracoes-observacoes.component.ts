import { IComponentOptions } from 'angular';

export class AlteracoesObservacoesComponent implements IComponentOptions {
    public bindings: {[boundProperty: string]: string};
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'alteracoesObservacoesController';
        this.bindings = { 'modalInstance': '<', 'resolve': '<' };
        this.template = require('app/alteracoes/alteracoes-observacoes.html!text');
    }
}