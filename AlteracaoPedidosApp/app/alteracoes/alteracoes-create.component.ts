import { IComponentOptions } from 'angular';

export class AlteracoesCreateComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'alteracoesCreateController';
        this.template = require('app/alteracoes/alteracoes-create.html!text');
    }
}