import { IComponentOptions } from 'angular';

export class SolucoesListComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'solucoesListController';
        this.template = require('app/solucoes/solucoes-list.html!text');
    }
}