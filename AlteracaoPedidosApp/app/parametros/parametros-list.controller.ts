import * as swal from 'sweetalert';
import { BaseClassController } from '../core/base.class';

import { ILogger } from '../logger';
import { ParametrosDataService, ParametroDto } from '../parametros';

export class ParametrosListController extends BaseClassController {
    public parametros: ParametroDto[];
    public parametroIdDelete: number;

    public static $inject: string[] = ['parametrosDataService', 'logger'];
    constructor(private dataService: ParametrosDataService, logger: ILogger) {
        super(logger);
    }

    public $onInit = () => {
        this.getParametros();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    public getParametros = () => {
        this.ativaCarregando();
        this.dataService
            .getParametros()
            .then(parametros => {
                this.parametros = parametros;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public exibeDelete = (parametro: ParametroDto) => {
        swal({
            title: 'Tem certeza que deseja deletar o parâmetro?',
            text: 'Essa operação não pode ser desfeita! <br />'
            + ' Parâmetro: ' + parametro.nome,
            type: 'warning',
            html: true,
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Deletar!',
            closeOnConfirm: false,
            cancelButtonText: 'Cancelar'
        },
            () => {
                this.deleteParametro(parametro.id);
            });
    }

    public deleteParametro = (parametroId: number) => {
        this.parametroIdDelete = parametroId;
        this.ativaCarregando();
        this.dataService
            .deleteParametro(parametroId)
            .then(this.deleteParametroResult)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private deleteParametroResult = () => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Parâmetro deletado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.parametros = $.grep(this.parametros, (e: ParametroDto) => {
            return e.id !== this.parametroIdDelete;
        });
        this.parametroIdDelete = null;
    }
}