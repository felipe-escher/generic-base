import { IComponentOptions } from 'angular';

export class AlteracoesBuscarComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'alteracoesBuscarController';
        this.template = require('app/alteracoes/alteracoes-buscar.html!text');
    }
}