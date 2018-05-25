import { IComponentOptions } from 'angular';

export class UsuariosPermissoesComponent implements IComponentOptions {
    public template: string;
    public controller: string;
    public bindings: {[boundProperty: string]: string};

    constructor() {
        this.bindings = { 'usuarioId': '<' };
        this.controller = 'usuariosPermissoesController';
        this.template = require('app/usuarios/usuarios-permissoes.html!text');
    }
}