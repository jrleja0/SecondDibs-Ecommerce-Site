const priceFormatterDollarsNoCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
});

const priceFormatterDollarsAndCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

module.exports = { priceFormatterDollarsNoCents, priceFormatterDollarsAndCents };
