export as namespace solucoes;

export { SolucoesDataService } from './solucoes-data.service'

import { baseEfModel } from '../core';
export interface SolucaoDto extends baseEfModel {
    [key: number]: number;
    descricao?: string;
    ativo?: boolean;
}
