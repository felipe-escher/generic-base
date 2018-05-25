export as namespace dams;

export { DamsDataService } from './dams-data.service';

import { baseEfModel } from '../core';

export interface DamDto extends baseEfModel {
    [key: number]: number;
    dataAbertura?: string;
    dataInicioAtendimento?: string;
    codigoCliente?: number;
    paciente?: string;
    numeroCrm?: string;
    medico?: string;
    atendenteId?: number;
    solucionadorNome?: string;
    solucionadorId?: number;
    dataResolucao?: string;
    ativosSubstituidos?: DamAtivosSubstituidosDto[];
    historico?: DamHistoricoDto[];
    imagens?: DamImagemDto[];
    solicitacao?: string;
    posicaoFinal?: string;
    motivoId?: number;
    motivoDescricao?: string;
    solucaoId?: number;
    solucaoDescricao?: string;
    dataUltimaAtualizacao?: string;
    dataFinalizacao?: string;
    finalizado?: boolean;
    posicoesNaoLidas?: boolean;
}

export interface DamPosicoesDto {
    data: string;
    atendimentos: DamAtendimentoDto[];
}

export interface DamAtendimentoDto extends baseEfModel {
    damId?: number;
    data?: string;
    posicao?: string;
    usuarioId?: number;
    usuarioNome?: string;
}

export interface DamAtivosSubstituidosDto extends baseEfModel {
    damId?: number;
    data?: string;
    ativoEmFalta?: string;
    ativoSubstituto?: string;
}

export interface DamHistoricoDto extends baseEfModel {
    damId?: number;
    data?: string;
    posicao?: string;
    usuario?: string;
}

export interface DamImagemDto extends baseEfModel {
    damId?: number;
    caminho?: string;
    isImagem?: boolean;
}

export interface FcertaClienteDto {
    codigo?: number;
    nome?: string;
}

export interface FcertaMedicoDto {
    profissao: string;
    ufCrm: string;
    numeroCrm: number;
    nome: string;
}

export interface ParametrosBusca {
    DataDe: string;
    DataAte: string;
    Medico: string;
    Paciente: string;
    SolucaoId: number;
    SolucionadorId: number;
    MotivoId: number;
    AtendenteId: number;
}
