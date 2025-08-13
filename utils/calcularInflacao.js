export function calcularInflacao(valorAtual, taxa, tempo) {
  const valorFuturo = valorAtual / Math.pow(1 + taxa / 100, tempo);
  const perda = valorAtual - valorFuturo;

  return {
    valorFuturo: valorFuturo.toFixed(2),
    perdaPoderCompra: perda.toFixed(2),
  };
}
