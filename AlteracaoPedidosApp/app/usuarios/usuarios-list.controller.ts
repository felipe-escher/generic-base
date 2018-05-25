import { BaseClassController } from '../core/base.class';
import { ILogger } from '../logger';
import { UsuariosDataService, UsuarioDto } from '../usuarios';

export class UsuariosListController extends BaseClassController {
    public usuarios: UsuarioDto[];

    public busca: string;
    public exibir: string;

    public static $inject: string[] = ['usuariosDataService', 'logger'];
    constructor(private dataService: UsuariosDataService, logger: ILogger) {
        super(logger);
        this.exibir = 'Ativos';
    }

    public $onInit = () => {
        this.getUsuarios();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private getUsuarios: () => void = () => {
        this.ativaCarregando();
        this.dataService
            .getUsuarios(this.exibir)
            .then(usuarios => {
                this.usuarios = usuarios;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public exibirTodos = () => {
        this.exibir = 'Todos';
        this.getUsuarios();
    }

    public exibirAtivos = () => {
        this.exibir = 'Ativos';
        this.getUsuarios();
    }

    public updateUsuario = (usuario: UsuarioDto) => {
        if (usuario.ativo) {
            usuario.ativo = false;
        } else {
            usuario.ativo = true;
        }

        this.dataService
            .updateUsuario(usuario.id, usuario)
            .then(this.updateUsuarioSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private updateUsuarioSuccess: () => void = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Usuário alterado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.getUsuarios();
    }
}