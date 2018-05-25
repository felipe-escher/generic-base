import swal from 'sweetalert2';
import { ILogger } from '../logger';
import { IAppScope } from '../core';
import { BaseClassController } from '../core/base.class';
import { DamsDataService, DamAtivosSubstituidosDto } from '../dams';

export class DamsAtivosController extends BaseClassController {
    public ativos: DamAtivosSubstituidosDto[];
    public damId: number;
    public emFalta: string;
    public atender: boolean;
    public substituto: string;

    public static $inject: string[] = ['damsDataService', 'logger', '$scope'];
    constructor(
        private dataService: DamsDataService,
        logger: ILogger,
        private $scope: IAppScope
    ) {
        super(logger);
        this.emFalta = '';
        this.substituto = '';
    }

    public addAtivoSubstituido = () => {
        this.$scope.$broadcast('show-errors-check-validity');

        if (this.emFalta === '' || this.substituto === '') { return; }
        this.ativaCarregando();
        this.dataService
            .createAtivoSubstituido(this.damId, this.emFalta, this.substituto)
            .then(this.createSuccess)
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private createSuccess = (ativo: DamAtivosSubstituidosDto) => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Ativo adicionado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.ativos.push(ativo);
        this.emFalta = '';
        this.substituto = '';
    }

    public deleteAtivoSubstituido = (ativoId: number) => {
        this.ativaCarregando();
        this.dataService
            .deleteAtivoSubstituido(ativoId)
            .then(() => {
                this.deleteAtivoResult(ativoId);
            })
            .catch(this.callbackFail)
            .finally(this.desativaCarregando);
    }

    private deleteAtivoResult = (ativoId: number) => {
        swal({
            showConfirmButton: false,
            title: 'Sucesso!',
            text: 'Ativo deletado com sucesso.',
            timer: 2000,
            type: 'success'
        });
        this.ativos = $.grep(this.ativos, (a: DamAtivosSubstituidosDto) => {
            return a.id !== ativoId;
        });
    }
}
