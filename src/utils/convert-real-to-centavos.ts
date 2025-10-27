
export const transformToCentavos = (real: string): number => {
  const formatNumber = parseFloat(real.replace(/\./g, '').replace(',', '.'));

  const centavos = Math.round(formatNumber * 100);

  return centavos;
}