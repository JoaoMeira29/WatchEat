'use strict';
const estadosUtilizadores = {
    EU_Ativo: 'Ativo',
    EU_Suspenso: 'Suspenso',
    EU_Bloqueado: 'Bloqueado'
}

const estadosConteudosBiblioteca = {
    EB_ParaAssistir: 'Para Assistir',
    EB_Terminado: 'Terminado',
    EB_Assistindo: 'Assistindo',
    EB_EmEspera: 'Em Espera',
    EB_Cancelado: 'Cancelado',
}

const estadosPagamentos = {
    EP_Pago: 'Pago',
    EP_NaoPago: 'Não Pago',
    EP_TerminouPrazo: 'Terminou o Prazo'
}

const estadosPedidos = {
    EP_EmAberto: 'Em Aberto',
    EP_Cancelado: 'Cancelado',
    EP_CanceladoDPagamento: 'Cancelado Depois de Pagamento',
    EP_Pago: 'Pago',
    EP_NaoPago: 'Não Pago',
    EP_EmPreparacao: 'Em Preparação',
    EP_Expedido: 'Expedido',
    EP_Entregue: 'Entregue',
    EP_UtilizadorNaoApareceu: 'Utilizador Não Apareceu',
    EP_SitioNaoEncontrado: 'Sitio Não Encontrado'
}

const estadosAmizade = {
    EA_Amigos: 'Amigos',
    EA_PedidoEnviado: 'Pedido Enviado'
}

const estadosSerie = {
    ES_ADecorrer: 'A decorrer',
    ES_Concluido: 'Concluido',
    ES_Brevemente: 'Brevemente'
}

const visibilidadeBiblioteca = {
    VB_Publica: 'Publica',
    VB_Privada: 'Privada',
    VB_FriendsOnly: 'Friends Only'
}

const estadoAlteracao = {
    EA_EmEspera: 'Em Espera',
    EA_Aceite: 'Aceite',
    EA_NaoAceite: 'Não Aceite'
}

const user_roles = {
    UR_Normal: 'Normal',
    UR_Premium: 'Premium',
    UR_Admin: 'Admin'
}

module.exports = {
    estadosUtilizadores,
    estadosConteudosBiblioteca,
    estadosPagamentos,
    estadosPedidos,
    estadosAmizade,
    estadosSerie,
    estadoAlteracao,
    visibilidadeBiblioteca,
    user_roles
}