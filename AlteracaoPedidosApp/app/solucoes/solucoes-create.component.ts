import { IComponentOptions } from 'angular';

export class SolucoesCreateComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'solucoesCreateController';
        this.template = require('app/solucoes/solucoes-create.html!text');
    }
}