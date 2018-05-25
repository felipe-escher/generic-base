import { IComponentOptions } from 'angular';

export class UsuariosListComponent implements IComponentOptions {
    public template: string;
    public controller: string;

    constructor() {
        this.controller = 'usuariosListController';
        this.template = require('app/usuarios/usuarios-list.html!text');
    }
}