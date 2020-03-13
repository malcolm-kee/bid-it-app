export const formatMoney = (amount: number): string => {
  const [integer, decimals] = amount.toFixed(2).split('.');

  return `RM ${Number(integer).toLocaleString()}.${decimals}`;
};
