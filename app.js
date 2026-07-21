function limpar(valor) { return String(valor || '').trim(); }
function gerar(d) {
  const data = d.data ? new Date(`${d.data}T12:00:00`).toLocaleDateString('pt-BR') : '[data]';
  return `Assunto: Solicitação de reembolso — pedido ${limpar(d.pedido)}

À ${limpar(d.fornecedor)},

Eu, ${limpar(d.nome)}, solicito o reembolso do valor de R$ ${limpar(d.valor)}, referente a ${limpar(d.item)}, adquirido(a) em ${data}, pedido ${limpar(d.pedido)}.

Motivo: ${limpar(d.motivo)}.

Relato: ${limpar(d.fatos)}

O pagamento foi realizado por ${limpar(d.pagamento)}. Solicito a confirmação do recebimento desta mensagem, as instruções necessárias e a informação do prazo para devolução do valor pelo mesmo meio de pagamento, quando aplicável.

Documentos que posso apresentar: comprovante de compra e pagamento, registros de contato e demais evidências relacionadas.

Atenciosamente,
${limpar(d.nome)}`;
}
if (typeof document !== 'undefined') {
  const ids = ['nome','fornecedor','pedido','data','item','valor','motivo','fatos','pagamento'];
  document.querySelector('#form').addEventListener('submit', e => {
    e.preventDefault(); const dados = Object.fromEntries(ids.map(id => [id, document.querySelector(`#${id}`).value]));
    document.querySelector('#texto').textContent = gerar(dados); document.querySelector('#resultado').hidden = false;
    document.querySelector('#resultado').scrollIntoView({behavior:'smooth'});
  });
  document.querySelector('#copiar').addEventListener('click', async () => { await navigator.clipboard.writeText(document.querySelector('#texto').textContent); document.querySelector('#copiar').textContent='Copiado!'; });
}
if (typeof module !== 'undefined') module.exports = { gerar, limpar };

