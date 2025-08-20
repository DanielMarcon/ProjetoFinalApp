export function calcularJurosCompostos(valorInicial, taxa, tempo, aporteMensal = 0) {
  const i = taxa / 100;
  const n = tempo;
  const P = valorInicial;
  const PMT = aporteMensal;

  // Valor final considerando aportes mensais
  const valorFinal = P * Math.pow(1 + i, n) + PMT * ( (Math.pow(1 + i, n) - 1) / i );

  // Total investido
  const totalInvestido = P + PMT * n;

  // Juros ganhos
  const jurosGanhos = valorFinal - totalInvestido;

  return {
    valorFinal: valorFinal.toFixed(2),
    jurosGanhos: jurosGanhos.toFixed(2),
  };
}
