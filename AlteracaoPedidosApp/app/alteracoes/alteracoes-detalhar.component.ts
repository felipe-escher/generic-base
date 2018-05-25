import { IComponentOptions } from 'angular';

export class AlteracoesDetalharComponent implements IComponentOptions {
    public template: string;
    public controller: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.bindings = { 'alteracaoId': '<' };
        this.controller = 'alteracoesDetalharController';
        this.template = require('app/alteracoes/alteracoes-detalhar.html!text');
    }
}