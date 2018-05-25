import swal from 'sweetalert2';
import { ILocationService } from 'angular';
import { IModalService, IModalSettings } from 'angular-ui-bootstrap';
import { IAuthService } from '../auth';
import { ILogger } from '../logger';
import { BaseClassController } from '../core/base.class';
import { IAppScope } from '../core';
import { DamsDataService, DamDto, FcertaMedicoDto } from '../dams';

export class DamsCreateController extends BaseClassController {
    public dam: DamDto;
    public desabilitaMedico: boolean;

    public static $inject: string[] = ['damsDataService', '$scope', '$location', 'logger', 'AuthService', '$uibModal'];
    constructor(
        private dataService: DamsDataService,
        private $scope: IAppScope,
        private $location: ILocationService,
        logger: ILogger,
        private authService: IAuthService,
        private $uibModal: IModalService
    ) {
        super(logger);
        this.desabilitaMedico = false;
    }

    public $onInit = () => {
        this.limparDam();
        $.AdminLTE.layout.fix();
        $.AdminLTE.layout.fixSidebar();
    }

    private limparDam = () => {
        this.dam = {
            atendenteId: this.authService.autenticacao.userId,
            paciente: '',
            numeroCrm: '',
            medico: '',
            solicitacao: ''
        };
    }

    public createDam = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.$scope.formCreate.$invalid) { return; }
        this.ativaCarregando();
        this.dataService
            .createDam(this.dam)
            .then(this.createSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private createSuccess = (dam: DamDto) => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Dam adicionado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.$location.path('/dams/detalhar/' + dam.id);
    }

    public buscarMedico = () => {
        var modalSettings: IModalSettings = {
            component: 'damsBuscarMedicoComponent',
            size: 'lg',
            resolve: {
                busca: () => {
                    return this.dam.medico;
                }
            }
        };
        this.$uibModal.open(modalSettings).result.then((medico: FcertaMedicoDto) => {
            this.dam.numeroCrm = medico.profissao + '-' + medico.ufCrm + '-' + medico.numeroCrm;
            this.dam.medico = medico.nome;
            this.desabilitaMedico = true;
        }, () => { return true; });
    }

    public buscarCliente = () => {
        this.ativaCarregando();
        this.dataService.getCliente(this.dam.codigoCliente)
            .then(cliente => {
                this.dam.paciente = cliente.nome;
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    public cancelCreate = () => {
        this.limparDam();
        this.$location.path('/dams/listar');
    }
}