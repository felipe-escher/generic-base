export as namespace parametros;

export { ParametrosDataService } from './parametros-data.service';

import { baseEfModel } from '../core';
export interface ParametroDto extends baseEfModel {
    [key: number]: number;
    nome: string;
    argumento: string;
    subArgumento?: string;
    descricao?: string;
}
