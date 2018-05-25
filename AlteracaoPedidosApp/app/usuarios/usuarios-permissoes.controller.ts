import * as swal from 'sweetalert';
import * as angular from 'angular';
import { ILocationService } from 'angular';

import { BaseClassController } from '../core/base.class';
import { ILogger } from '../logger';
import { UsuariosDataService, UsuarioDto } from '../usuarios';

export class UsuariosPermissoesController extends BaseClassController {
    public permissoes: any;
    public usuario: UsuarioDto;
    public usuarioId: number;

    public static $inject: string[] = ['usuariosDataService', 'logger', '$location'];
    constructor(private dataService: UsuariosDataService, logger: ILogger, private $location: ILocationService) {
        super(logger);
    }

    public $onInit = () => {
        this.getUsuario(this.usuarioId);
        this.dataService.getPermissoes().then(this.getPermissoesSuccess).catch(this.callbackFail);
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    public getPermissoesSuccess = (permissoes: any) => {
        this.permissoes = permissoes;
    }

    public togglePermissoes: (permissao: any) => void = (permissao: any) => {
        var idx: any = this.usuario.permissoes.indexOf(permissao);

        if (idx > -1) {
            this.usuario.permissoes.splice(idx, 1);
        } else {
            this.usuario.permissoes.push(permissao);
        }
    }

    public getUsuario: (usuarioId: number) => void = (usuarioId: number) => {
        this.ativaCarregando();
        this.dataService
            .getUsuario(usuarioId)
            .then(this.getSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private getSuccess: (usuario: UsuarioDto) => void = (usuario: UsuarioDto) => {
        this.usuario = usuario;
        this.usuario.permissoes = angular.fromJson(usuario.permissoes);
    }

    public alterarPermissoes: () => void = () => {
        this.ativaCarregando();
        this.usuario.permissoes = angular.toJson(this.usuario.permissoes);
        this.dataService
            .updateUsuario(this.usuario.id, this.usuario)
            .then(this.alterarPermissoesSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private alterarPermissoesSuccess: () => void = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Permissões alteradas com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.$location.path('/usuarios/listar');
    }
}