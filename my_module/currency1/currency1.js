class Currency {
  constructor(canadianDollar) {
    this.canadianDollar = canadianDollar;
  }

  rountTwo(amount) {
    return Math.round(amount * 100) / 100;
  }

  canadianToUS(canadian) {
    return this.rountTwo(canadian * this.canadianDollar);
  }

  USToCanadian(us) {
    return this.rountTwo(us / this.canadianDollar);
  }
}

module.exports = Currency;
